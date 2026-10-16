import { describe, expect, it } from 'vitest';
import { createRateLimiter, isSuspectedSpam, MIN_FILL_TIME_MS } from '../server/contact/antiSpam';

const now = 1_800_000_000_000;

describe('isSuspectedSpam', () => {
  it('passes a human-looking submission', () => {
    expect(isSuspectedSpam({ website: '', startedAt: now - 15_000 }, now)).toBe(false);
  });
  it('flags a filled honeypot', () => {
    expect(isSuspectedSpam({ website: 'http://spam.example', startedAt: now - 15_000 }, now)).toBe(true);
  });
  it('flags submissions faster than the minimum fill time', () => {
    expect(isSuspectedSpam({ website: '', startedAt: now - MIN_FILL_TIME_MS + 1 }, now)).toBe(true);
  });
  it('flags a missing or malformed start timestamp', () => {
    expect(isSuspectedSpam({ website: '', startedAt: undefined }, now)).toBe(true);
    expect(isSuspectedSpam({ website: '', startedAt: 'yesterday' }, now)).toBe(true);
  });
});

describe('createRateLimiter', () => {
  it('allows up to the limit then blocks with a retry hint', () => {
    const limiter = createRateLimiter({ limit: 3, windowMs: 60_000 });
    expect(limiter.check('ip', now).allowed).toBe(true);
    expect(limiter.check('ip', now + 1).allowed).toBe(true);
    expect(limiter.check('ip', now + 2).allowed).toBe(true);
    const blocked = limiter.check('ip', now + 3);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
    expect(blocked.retryAfterSeconds).toBeLessThanOrEqual(60);
  });

  it('is per key and slides with time', () => {
    const limiter = createRateLimiter({ limit: 1, windowMs: 1_000 });
    expect(limiter.check('a', now).allowed).toBe(true);
    expect(limiter.check('b', now).allowed).toBe(true);
    expect(limiter.check('a', now + 500).allowed).toBe(false);
    expect(limiter.check('a', now + 1_001).allowed).toBe(true);
  });
});
