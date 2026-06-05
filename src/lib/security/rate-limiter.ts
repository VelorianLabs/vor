/**
 * VOR Phase 2 - Rate Limiting
 * 
 * Rate limiting implementation to prevent abuse and protect API endpoints.
 * Uses in-memory storage for development, can be extended to use Redis for production.
 */

interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Maximum requests per window
  skipSuccessfulRequests?: boolean; // Skip counting successful requests
  skipFailedRequests?: boolean; // Skip counting failed requests
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: Date;
}

// In-memory storage for rate limits (for development)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

/**
 * Rate limiter class
 */
export class RateLimiter {
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  /**
   * Check if request should be rate limited
   */
  check(identifier: string): RateLimitResult {
    const now = Date.now();
    const windowStart = now - this.config.windowMs;
    
    // Get or create rate limit entry
    let entry = rateLimitStore.get(identifier);
    
    if (!entry || entry.resetTime < windowStart) {
      // Reset the counter
      entry = {
        count: 0,
        resetTime: now + this.config.windowMs,
      };
      rateLimitStore.set(identifier, entry);
    }

    // Check if limit exceeded
    if (entry.count >= this.config.maxRequests) {
      return {
        success: false,
        limit: this.config.maxRequests,
        remaining: 0,
        reset: new Date(entry.resetTime),
      };
    }

    // Increment counter
    entry.count++;
    rateLimitStore.set(identifier, entry);

    return {
      success: true,
      limit: this.config.maxRequests,
      remaining: this.config.maxRequests - entry.count,
      reset: new Date(entry.resetTime),
    };
  }

  /**
   * Reset rate limit for identifier
   */
  reset(identifier: string): void {
    rateLimitStore.delete(identifier);
  }

  /**
   * Clean up expired entries
   */
  cleanup(): void {
    const now = Date.now();
    for (const [key, value] of rateLimitStore.entries()) {
      if (value.resetTime < now) {
        rateLimitStore.delete(key);
      }
    }
  }
}

// ============================================
// PRE-CONFIGURED RATE LIMITERS
// ============================================

export const apiRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 100, // 100 requests per 15 minutes
});

export const authRateLimiter = new RateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5, // 5 login attempts per 15 minutes
});

export const uploadRateLimiter = new RateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 20, // 20 uploads per hour
});

export const paymentRateLimiter = new RateLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 10, // 10 payment attempts per hour
});

// Cleanup expired entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    apiRateLimiter.cleanup();
    authRateLimiter.cleanup();
    uploadRateLimiter.cleanup();
    paymentRateLimiter.cleanup();
  }, 5 * 60 * 1000);
}

// ============================================
// MIDDLEWARE HELPER
// ============================================

/**
 * Apply rate limiting to an API route
 */
export function withRateLimit(
  rateLimiter: RateLimiter,
  identifier: string
): RateLimitResult {
  return rateLimiter.check(identifier);
}

/**
 * Get rate limit headers for response
 */
export function getRateLimitHeaders(result: RateLimitResult): Record<string, string> {
  return {
    'X-RateLimit-Limit': result.limit.toString(),
    'X-RateLimit-Remaining': result.remaining.toString(),
    'X-RateLimit-Reset': result.reset.getTime().toString(),
  };
}
