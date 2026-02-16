/**
 * Simple in-memory rate limiter for API routes
 * Note: For production, use Redis or similar persistent storage
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

interface RateLimitConfig {
  windowMs?: number; // Time window in milliseconds (default: 15 minutes)
  maxRequests?: number; // Max requests per window (default: 5)
}

const DEFAULT_CONFIG: Required<RateLimitConfig> = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5,
};

/**
 * Check if a request exceeds rate limit
 * @param identifier - IP address or user identifier
 * @param config - Rate limit configuration
 * @returns true if request is allowed, false if rate limited
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = {}
): boolean {
  const { windowMs, maxRequests } = { ...DEFAULT_CONFIG, ...config };
  const now = Date.now();

  const entry = rateLimitStore.get(identifier);

  // First request or window expired
  if (!entry || now > entry.resetTime) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return true;
  }

  // Check if limit exceeded
  if (entry.count >= maxRequests) {
    return false;
  }

  // Increment counter
  entry.count++;
  return true;
}

/**
 * Get remaining requests for an identifier
 * @param identifier - IP address or user identifier
 * @param config - Rate limit configuration
 * @returns number of remaining requests
 */
export function getRemainingRequests(
  identifier: string,
  config: RateLimitConfig = {}
): number {
  const { maxRequests } = { ...DEFAULT_CONFIG, ...config };
  const entry = rateLimitStore.get(identifier);

  if (!entry || Date.now() > entry.resetTime) {
    return maxRequests;
  }

  return Math.max(0, maxRequests - entry.count);
}

/**
 * Reset rate limit for an identifier
 * @param identifier - IP address or user identifier
 */
export function resetRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier);
}

/**
 * Get client IP from request
 * @param request - NextRequest object
 * @returns IP address
 */
export function getClientIP(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return headers.get('x-real-ip') || 'unknown';
}

/**
 * Clean up expired entries periodically
 * Call this occasionally to prevent memory leak
 */
export function cleanupExpiredEntries(): void {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}

// Auto cleanup every 10 minutes
if (typeof window === 'undefined') {
  setInterval(cleanupExpiredEntries, 10 * 60 * 1000);
}
