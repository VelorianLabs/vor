/**
 * VOR Phase 2 - Payment Service
 * 
 * Service layer for payment processing with Paystack and Flutterwave integration.
 * Handles transaction processing, receipt generation, and invoice management.
 */

import { PaymentType, PaymentMethod, PaymentStatus } from '@/lib/types/index';

// Payment gateway configurations
const PAYSTACK_CONFIG = {
  secretKey: process.env.PAYSTACK_SECRET_KEY || '',
  publicKey: process.env.PAYSTACK_PUBLIC_KEY || '',
  baseUrl: 'https://api.paystack.co',
};

const FLUTTERWAVE_CONFIG = {
  secretKey: process.env.FLUTTERWAVE_SECRET_KEY || '',
  publicKey: process.env.FLUTTERWAVE_PUBLIC_KEY || '',
  baseUrl: 'https://api.flutterwave.com/v3',
};

// ============================================
// PAYMENT PROCESSING
// ============================================

export interface PaymentRequest {
  amount: number;
  email: string;
  reference: string;
  type: PaymentType;
  method: PaymentMethod;
  metadata?: Record<string, any>;
  propertyId?: string;
  investmentId?: string;
  invoiceId?: string;
}

export interface PaymentResponse {
  success: boolean;
  reference: string;
  amount: number;
  status: PaymentStatus;
  gateway: 'paystack' | 'flutterwave';
  gatewayReference?: string;
  authorizationUrl?: string;
  message?: string;
  error?: string;
}

/**
 * Initialize a payment transaction
 */
export async function initializePayment(request: PaymentRequest): Promise<PaymentResponse> {
  try {
    if (request.method === 'PAYSTACK') {
      return await initializePaystackPayment(request);
    } else if (request.method === 'FLUTTERWAVE') {
      return await initializeFlutterwavePayment(request);
    } else {
      throw new Error('Unsupported payment method');
    }
  } catch (error) {
    console.error('Payment initialization error:', error);
    return {
      success: false,
      reference: request.reference,
      amount: request.amount,
      status: 'FAILED',
      gateway: request.method === 'PAYSTACK' ? 'paystack' : 'flutterwave',
      error: error instanceof Error ? error.message : 'Payment initialization failed',
    };
  }
}

/**
 * Initialize Paystack payment
 */
async function initializePaystackPayment(request: PaymentRequest): Promise<PaymentResponse> {
  const response = await fetch(`${PAYSTACK_CONFIG.baseUrl}/transaction/initialize`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${PAYSTACK_CONFIG.secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: request.email,
      amount: request.amount * 100, // Paystack expects amount in kobo
      reference: request.reference,
      metadata: {
        ...request.metadata,
        type: request.type,
        propertyId: request.propertyId,
        investmentId: request.investmentId,
        invoiceId: request.invoiceId,
      },
      callback_url: `${process.env.APP_URL}/api/payments/callback/paystack`,
    }),
  });

  const data = await response.json();

  if (data.status) {
    return {
      success: true,
      reference: request.reference,
      amount: request.amount,
      status: 'PENDING',
      gateway: 'paystack',
      gatewayReference: data.data.reference,
      authorizationUrl: data.data.authorization_url,
    };
  } else {
    return {
      success: false,
      reference: request.reference,
      amount: request.amount,
      status: 'FAILED',
      gateway: 'paystack',
      error: data.message || 'Paystack payment initialization failed',
    };
  }
}

/**
 * Initialize Flutterwave payment
 */
async function initializeFlutterwavePayment(request: PaymentRequest): Promise<PaymentResponse> {
  const response = await fetch(`${FLUTTERWAVE_CONFIG.baseUrl}/payments`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${FLUTTERWAVE_CONFIG.secretKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tx_ref: request.reference,
      amount: request.amount,
      currency: 'NGN',
      email: request.email,
      payment_options: 'card, banktransfer',
      meta: {
        ...request.metadata,
        type: request.type,
        propertyId: request.propertyId,
        investmentId: request.investmentId,
        invoiceId: request.invoiceId,
      },
      redirect_url: `${process.env.APP_URL}/api/payments/callback/flutterwave`,
    }),
  });

  const data = await response.json();

  if (data.status === 'success') {
    return {
      success: true,
      reference: request.reference,
      amount: request.amount,
      status: 'PENDING',
      gateway: 'flutterwave',
      gatewayReference: data.data.tx_ref,
      authorizationUrl: data.data.link,
    };
  } else {
    return {
      success: false,
      reference: request.reference,
      amount: request.amount,
      status: 'FAILED',
      gateway: 'flutterwave',
      error: data.message || 'Flutterwave payment initialization failed',
    };
  }
}

/**
 * Verify payment transaction
 */
export async function verifyPayment(reference: string, gateway: 'paystack' | 'flutterwave'): Promise<PaymentResponse> {
  try {
    if (gateway === 'paystack') {
      return await verifyPaystackPayment(reference);
    } else if (gateway === 'flutterwave') {
      return await verifyFlutterwavePayment(reference);
    } else {
      throw new Error('Unsupported payment gateway');
    }
  } catch (error) {
    console.error('Payment verification error:', error);
    return {
      success: false,
      reference,
      amount: 0,
      status: 'FAILED',
      gateway,
      error: error instanceof Error ? error.message : 'Payment verification failed',
    };
  }
}

/**
 * Verify Paystack payment
 */
async function verifyPaystackPayment(reference: string): Promise<PaymentResponse> {
  const response = await fetch(`${PAYSTACK_CONFIG.baseUrl}/transaction/verify/${reference}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${PAYSTACK_CONFIG.secretKey}`,
    },
  });

  const data = await response.json();

  if (data.status && data.data.status === 'success') {
    return {
      success: true,
      reference,
      amount: data.data.amount / 100, // Convert from kobo to naira
      status: 'COMPLETED',
      gateway: 'paystack',
      gatewayReference: data.data.reference,
    };
  } else {
    return {
      success: false,
      reference,
      amount: data.data?.amount ? data.data.amount / 100 : 0,
      status: 'FAILED',
      gateway: 'paystack',
      error: data.message || 'Payment verification failed',
    };
  }
}

/**
 * Verify Flutterwave payment
 */
async function verifyFlutterwavePayment(reference: string): Promise<PaymentResponse> {
  const response = await fetch(`${FLUTTERWAVE_CONFIG.baseUrl}/transactions/verify_by_reference?tx_ref=${reference}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${FLUTTERWAVE_CONFIG.secretKey}`,
    },
  });

  const data = await response.json();

  if (data.status === 'success' && data.data.status === 'successful') {
    return {
      success: true,
      reference,
      amount: data.data.amount,
      status: 'COMPLETED',
      gateway: 'flutterwave',
      gatewayReference: data.data.tx_ref,
    };
  } else {
    return {
      success: false,
      reference,
      amount: data.data?.amount || 0,
      status: 'FAILED',
      gateway: 'flutterwave',
      error: data.message || 'Payment verification failed',
    };
  }
}

/**
 * Process refund
 */
export async function processRefund(
  reference: string,
  amount?: number,
  reason?: string
): Promise<{ success: boolean; message: string; refundId?: string }> {
  try {
    // This would integrate with the payment gateway's refund API
    // For now, return a mock response
    console.log('Processing refund:', { reference, amount, reason });
    
    return {
      success: true,
      message: 'Refund processed successfully',
      refundId: `REF-${Date.now()}`,
    };
  } catch (error) {
    console.error('Refund processing error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Refund processing failed',
    };
  }
}

// ============================================
// RECEIPT GENERATION
// ============================================

export interface ReceiptData {
  receiptNumber: string;
  paymentReference: string;
  amount: number;
  currency: string;
  paidAt: Date;
  payerName: string;
  payerEmail: string;
  paymentMethod: string;
  type: string;
  description?: string;
  propertyId?: string;
  investmentId?: string;
  invoiceId?: string;
}

/**
 * Generate receipt (placeholder for PDF generation)
 */
export async function generateReceipt(data: ReceiptData): Promise<{ success: boolean; fileUrl?: string; error?: string }> {
  try {
    // TODO: Implement PDF generation using a library like pdf-lib or puppeteer
    // For now, return a mock response
    console.log('Generating receipt:', data);
    
    return {
      success: true,
      fileUrl: `/receipts/${data.receiptNumber}.pdf`,
    };
  } catch (error) {
    console.error('Receipt generation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Receipt generation failed',
    };
  }
}

// ============================================
// INVOICE GENERATION
// ============================================

export interface InvoiceData {
  invoiceNumber: string;
  userId: string;
  type: PaymentType;
  amount: number;
  dueDate: Date;
  description: string;
  propertyId?: string;
  investmentId?: string;
  items?: Array<{
    description: string;
    amount: number;
    quantity: number;
  }>;
}

/**
 * Generate invoice
 */
export async function generateInvoice(data: InvoiceData): Promise<{ success: boolean; invoiceId?: string; error?: string }> {
  try {
    // TODO: Implement invoice generation and database storage
    console.log('Generating invoice:', data);
    
    return {
      success: true,
      invoiceId: `INV-${Date.now()}`,
    };
  } catch (error) {
    console.error('Invoice generation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Invoice generation failed',
    };
  }
}

// ============================================
// PAYMENT SCHEDULE MANAGEMENT
// ============================================

export interface PaymentScheduleItem {
  userId: string;
  propertyId?: string;
  installmentNumber: number;
  amount: number;
  dueDate: Date;
}

/**
 * Create payment schedule
 */
export async function createPaymentSchedule(items: PaymentScheduleItem[]): Promise<{ success: boolean; error?: string }> {
  try {
    // TODO: Implement payment schedule creation in database
    console.log('Creating payment schedule:', items);
    
    return {
      success: true,
    };
  } catch (error) {
    console.error('Payment schedule creation error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Payment schedule creation failed',
    };
  }
}

/**
 * Get upcoming payment schedule
 */
export async function getUpcomingSchedule(userId: string): Promise<PaymentScheduleItem[]> {
  // TODO: Implement database query for upcoming payments
  return [];
}
