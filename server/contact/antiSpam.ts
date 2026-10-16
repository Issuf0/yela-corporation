/** Proportionate, dependency-free abuse protection for a public contact form. */

/** Humans need at least this long to fill in the form. */
export const MIN_FILL_TIME_MS = 3_000;

export interface SpamSignals {
  /** Honeypot field: must stay empty. */
  website: unknown;
  /** Epoch milliseconds captured by the browser when the form was rendered. */
  startedAt: unknown;
}

export function isSuspectedSpam(signals: SpamSignals, now: number): boolean {
  if (typeof signals.website === 'string' && signals.website.trim() !== '') return true;
  if (signals.website !== undefined && signals.website !== '' && signals.website !== null) return true;
  if (typeof signals.startedAt !== 'number' || !Number.isFinite(signals.startedAt)) return true;
  if (now - signals.startedAt < MIN_FILL_TIME_MS) return true;
  return false;
}

export interface RateLimitDecision {
  allowed: boolean;
  retryAfterSeconds: number;
}

export interface RateLimiter {
  check(key: string, now: number): RateLimitDecision;
}

export interface RateLimiterOptions {
  limit: number;
  windowMs: number;
  /** Safety cap on tracked keys, to bound memory on long-lived instances. */
  maxKeys?: number;
}

/**
 * Sliding-window limiter kept in process memory.
 * On serverless platforms each warm instance has its own window, so this is a
 * first line of defence rather than a global guarantee (documented in README).
 */
export function createRateLimiter({ limit, windowMs, maxKeys = 5_000 }: RateLimiterOptions): RateLimiter {
  const hits = new Map<string, number[]>();

  function prune(now: number): void {
    for (const [key, times] of hits) {
      const fresh = times.filter((t) => now - t < windowMs);
      if (fresh.length === 0) hits.delete(key);
      else hits.set(key, fresh);
    }
  }

  return {
    check(key, now) {
      if (hits.size > maxKeys) prune(now);
      const fresh = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
      if (fresh.length >= limit) {
        const oldest = fresh[0] ?? now;
        const retryAfterSeconds = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
        hits.set(key, fresh);
        return { allowed: false, retryAfterSeconds };
      }
      fresh.push(now);
      hits.set(key, fresh);
      return { allowed: true, retryAfterSeconds: 0 };
    },
  };
}
