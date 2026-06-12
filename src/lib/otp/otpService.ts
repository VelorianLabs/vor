// Simple in-memory OTP storage (for development)
// In production, use Redis or database with expiration
const otpStore = new Map<string, { otp: string; expiresAt: number; email: string }>();

export function generateOTP(): string {
  // Generate 6-digit OTP
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function storeOTP(email: string, otp: string, expiresInMinutes: number = 10): void {
  const expiresAt = Date.now() + expiresInMinutes * 60 * 1000;
  otpStore.set(email, { otp, expiresAt, email });
}

export function verifyOTP(email: string, providedOtp: string): boolean {
  const stored = otpStore.get(email);
  
  if (!stored) {
    return false;
  }
  
  // Check if expired
  if (Date.now() > stored.expiresAt) {
    otpStore.delete(email);
    return false;
  }
  
  // Check if OTP matches
  if (stored.otp !== providedOtp) {
    return false;
  }
  
  // OTP verified, remove from store
  otpStore.delete(email);
  return true;
}

export function cleanupExpiredOTPs(): void {
  const now = Date.now();
  for (const [email, data] of otpStore.entries()) {
    if (now > data.expiresAt) {
      otpStore.delete(email);
    }
  }
}

// Cleanup expired OTPs every 5 minutes
if (typeof window === 'undefined') {
  setInterval(cleanupExpiredOTPs, 5 * 60 * 1000);
}
