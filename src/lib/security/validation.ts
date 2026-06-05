/**
 * VOR Phase 2 - Input Validation
 * 
 * Comprehensive input validation utilities for security and data integrity.
 */

// ============================================
// EMAIL VALIDATION
// ============================================

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function sanitizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

// ============================================
// PHONE NUMBER VALIDATION
// ============================================

export function isValidPhoneNumber(phone: string): boolean {
  // Nigerian phone number format: +234 followed by 10 digits
  const phoneRegex = /^\+234[0-9]{10}$/;
  return phoneRegex.test(phone);
}

export function sanitizePhoneNumber(phone: string): string {
  // Remove all non-digit characters except +
  return phone.replace(/[^\d+]/g, '');
}

// ============================================
// STRING VALIDATION
// ============================================

export function isValidString(value: string, minLength: number = 1, maxLength: number = 255): boolean {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  return trimmed.length >= minLength && trimmed.length <= maxLength;
}

export function sanitizeString(value: string): string {
  return value.trim().replace(/[<>]/g, '');
}

export function escapeHtml(value: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return value.replace(/[&<>"']/g, (char) => map[char]);
}

// ============================================
// NUMBER VALIDATION
// ============================================

export function isValidNumber(value: any): boolean {
  if (typeof value !== 'number') return false;
  return !isNaN(value) && isFinite(value);
}

export function isValidInteger(value: any): boolean {
  if (typeof value !== 'number') return false;
  return Number.isInteger(value);
}

export function isValidPositiveNumber(value: any): boolean {
  return isValidNumber(value) && value > 0;
}

export function isValidPositiveInteger(value: any): boolean {
  return isValidInteger(value) && value > 0;
}

export function isValidCurrencyAmount(value: any): boolean {
  if (!isValidNumber(value)) return false;
  return value >= 0 && value <= Number.MAX_SAFE_INTEGER;
}

// ============================================
// DATE VALIDATION
// ============================================

export function isValidDate(value: string): boolean {
  const date = new Date(value);
  return !isNaN(date.getTime());
}

export function isValidDateRange(startDate: string, endDate: string): boolean {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return start < end;
}

export function isValidFutureDate(value: string): boolean {
  const date = new Date(value);
  return !isNaN(date.getTime()) && date > new Date();
}

export function isValidPastDate(value: string): boolean {
  const date = new Date(value);
  return !isNaN(date.getTime()) && date < new Date();
}

// ============================================
// URL VALIDATION
// ============================================

export function isValidUrl(value: string): boolean {
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

export function sanitizeUrl(value: string): string {
  try {
    const url = new URL(value);
    // Ensure protocol is http or https
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return '';
    }
    return url.toString();
  } catch {
    return '';
  }
}

// ============================================
// FILE VALIDATION
// ============================================

export interface FileValidationOptions {
  maxSize?: number; // in bytes
  allowedTypes?: string[]; // MIME types
  allowedExtensions?: string[];
}

export function validateFile(file: File, options: FileValidationOptions): { valid: boolean; error?: string } {
  // Check file size
  if (options.maxSize && file.size > options.maxSize) {
    return {
      valid: false,
      error: `File size exceeds maximum of ${options.maxSize} bytes`,
    };
  }

  // Check file type
  if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `File type ${file.type} is not allowed`,
    };
  }

  // Check file extension
  if (options.allowedExtensions) {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (!extension || !options.allowedExtensions.includes(`.${extension}`)) {
      return {
        valid: false,
        error: `File extension .${extension} is not allowed`,
      };
    }
  }

  return { valid: true };
}

export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
export const ALLOWED_DOCUMENT_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  return validateFile(file, {
    maxSize: MAX_FILE_SIZE,
    allowedTypes: ALLOWED_IMAGE_TYPES,
  });
}

export function validateDocumentFile(file: File): { valid: boolean; error?: string } {
  return validateFile(file, {
    maxSize: MAX_FILE_SIZE,
    allowedTypes: ALLOWED_DOCUMENT_TYPES,
  });
}

// ============================================
// OBJECT VALIDATION
// ============================================

export function validateRequired(value: any, fieldName: string): { valid: boolean; error?: string } {
  if (value === null || value === undefined || value === '') {
    return {
      valid: false,
      error: `${fieldName} is required`,
    };
  }
  return { valid: true };
}

export function validateEnum(value: any, allowedValues: string[], fieldName: string): { valid: boolean; error?: string } {
  if (!allowedValues.includes(value)) {
    return {
      valid: false,
      error: `${fieldName} must be one of: ${allowedValues.join(', ')}`,
    };
  }
  return { valid: true };
}

export function validateLength(value: string, min: number, max: number, fieldName: string): { valid: boolean; error?: string } {
  if (value.length < min || value.length > max) {
    return {
      valid: false,
      error: `${fieldName} must be between ${min} and ${max} characters`,
    };
  }
  return { valid: true };
}

// ============================================
// NIGERIA-SPECIFIC VALIDATION
// ============================================

export function isValidNIN(nin: string): boolean {
  // Nigerian National Identification Number validation
  // NIN is 11 digits
  const ninRegex = /^[0-9]{11}$/;
  return ninRegex.test(nin);
}

export function isValidBVN(bvn: string): boolean {
  // Bank Verification Number validation
  // BVN is 11 digits
  const bvnRegex = /^[0-9]{11}$/;
  return bvnRegex.test(bvn);
}

export function isValidState(state: string): boolean {
  const states = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
    'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo',
    'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano',
    'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger',
    'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba',
    'Yobe', 'Zamfara', 'FCT',
  ];
  return states.includes(state);
}

export function isValidLGA(state: string, lga: string): boolean {
  // TODO: Implement LGA validation per state
  // For now, just check that LGA is provided
  return Boolean(lga && lga.length > 0);
}

// ============================================
// PASSWORD VALIDATION
// ============================================

export interface PasswordPolicy {
  minLength?: number;
  maxLength?: number;
  requireUppercase?: boolean;
  requireLowercase?: boolean;
  requireNumber?: boolean;
  requireSpecialChar?: boolean;
  forbiddenPatterns?: RegExp[];
}

export function validatePassword(password: string, policy: PasswordPolicy = {}): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const {
    minLength = 8,
    maxLength = 128,
    requireUppercase = true,
    requireLowercase = true,
    requireNumber = true,
    requireSpecialChar = true,
    forbiddenPatterns = [],
  } = policy;

  // Check length
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters`);
  }
  if (password.length > maxLength) {
    errors.push(`Password must not exceed ${maxLength} characters`);
  }

  // Check uppercase
  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  // Check lowercase
  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  // Check number
  if (requireNumber && !/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number');
  }

  // Check special character
  if (requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }

  // Check forbidden patterns
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(password)) {
      errors.push('Password contains forbidden pattern');
      break;
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// ============================================
// REQUEST BODY VALIDATION
// ============================================

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function validateRequestBody(body: any, schema: Record<string, (value: any) => { valid: boolean; error?: string }>): ValidationResult {
  const errors: Record<string, string> = {};

  for (const [field, validator] of Object.entries(schema)) {
    const value = body[field];
    const result = validator(value);

    if (!result.valid) {
      errors[field] = result.error || `${field} is invalid`;
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// ============================================
// SANITIZATION
// ============================================

export function sanitizeObject(obj: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (typeof value === 'object' && value !== null) {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

export function sanitizeArray(arr: any[]): any[] {
  return arr.map((item) => {
    if (typeof item === 'string') {
      return sanitizeString(item);
    } else if (typeof item === 'object' && item !== null) {
      return sanitizeObject(item);
    }
    return item;
  });
}
