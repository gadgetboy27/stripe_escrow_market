import { NextRequest } from 'next/server';

// Simple in-memory rate limiter
// For production, consider Redis or a more robust solution
interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// Clean up old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 10 * 60 * 1000);

interface RateLimitOptions {
  interval: number; // Time window in milliseconds
  uniqueTokenPerInterval: number; // Max requests per interval
}

export function rateLimit(options: RateLimitOptions) {
  const { interval, uniqueTokenPerInterval } = options;

  return {
    check: (request: NextRequest, limit: number, token: string): { success: boolean; remaining: number; reset: number } => {
      const now = Date.now();
      const key = `${token}`;

      if (!store[key] || store[key].resetTime < now) {
        store[key] = {
          count: 0,
          resetTime: now + interval,
        };
      }

      store[key].count++;

      const success = store[key].count <= limit;
      const remaining = Math.max(0, limit - store[key].count);
      const reset = store[key].resetTime;

      return { success, remaining, reset };
    },
  };
}

// Get client IP address
export function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (real) {
    return real;
  }

  return 'unknown';
}

// Pre-configured rate limiters for auth endpoints
export const authRateLimiter = rateLimit({
  interval: 15 * 60 * 1000, // 15 minutes
  uniqueTokenPerInterval: 500,
});

// Stricter rate limit for login attempts
export const loginRateLimiter = rateLimit({
  interval: 15 * 60 * 1000, // 15 minutes
  uniqueTokenPerInterval: 500,
});

// Rate limit for password reset
export const passwordResetRateLimiter = rateLimit({
  interval: 60 * 60 * 1000, // 1 hour
  uniqueTokenPerInterval: 500,
});
