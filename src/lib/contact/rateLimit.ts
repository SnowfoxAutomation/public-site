import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redisUrl =
  process.env.UPSTASH_REDIS_REST_URL;

const redisToken =
  process.env.UPSTASH_REDIS_REST_TOKEN;

const rateLimiter =
  redisUrl && redisToken
    ? new Ratelimit({
        redis: new Redis({
          url: redisUrl,
          token: redisToken,
        }),
        limiter: Ratelimit.slidingWindow(
          5,
          "15 m",
        ),
        analytics: true,
        prefix: "snowfox:contact",
      })
    : null;

export type ContactRateLimitResult = {
  allowed: boolean;
  retryAfterSeconds?: number;
};

export async function checkContactRateLimit(
  identifier: string,
): Promise<ContactRateLimitResult> {
  if (!rateLimiter) {
    return {
      allowed:
        process.env.NODE_ENV !== "production",
    };
  }

  try {
    const result =
      await rateLimiter.limit(identifier);

    if (result.success) {
      return {
        allowed: true,
      };
    }

    return {
      allowed: false,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil(
          (result.reset - Date.now()) / 1000,
        ),
      ),
    };
  } catch {
    return {
      allowed: false,
    };
  }
}