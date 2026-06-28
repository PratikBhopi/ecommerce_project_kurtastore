const { redisClient } = require("../config/redis");

const TOKEN_BUCKET_SCRIPT = `
local key = KEYS[1]
local capacity = tonumber(ARGV[1])
local refillInterval = tonumber(ARGV[2])
local now = tonumber(ARGV[3])
local requested = 1

local bucket = redis.call("HMGET", key, "tokens", "last_refill")
local tokens = tonumber(bucket[1])
local lastRefill = tonumber(bucket[2])

if not tokens then
    tokens = capacity
    lastRefill = now
else
    local elapsed = math.max(0, now - lastRefill)
    local refill = math.floor(elapsed / refillInterval)

    if refill > 0 then
        tokens = math.min(capacity, tokens + refill)
        lastRefill = lastRefill + (refill * refillInterval)
    end
end

local ttl = capacity * refillInterval

if tokens >= requested then
    tokens = tokens - requested

    redis.call("HSET", key,
        "tokens", tokens,
        "last_refill", lastRefill
    )
    redis.call("EXPIRE", key, ttl)

    return {1, tokens, 0}
else
    redis.call("HSET", key,
        "tokens", tokens,
        "last_refill", lastRefill
    )
    redis.call("EXPIRE", key, ttl)

    local retryAfter = refillInterval - ((now - lastRefill) % refillInterval)

    return {0, tokens, retryAfter}
end
`;

const rateLimiter = (capacity = 5, refillInterval = 15) => {
    return async (req, res, next) => {
        try {
            const ip = req.ip || req.socket.remoteAddress;
            const key = `rate_limit:auth:${ip}`;
            const now = Math.floor(Date.now() / 1000);

            const [allowed, remaining, retryAfter] = await redisClient.eval(
                TOKEN_BUCKET_SCRIPT,
                {
                    keys: [key],
                    arguments: [
                        capacity.toString(),
                        refillInterval.toString(),
                        now.toString(),
                    ],
                }
            );

            res.setHeader("X-RateLimit-Limit", capacity);
            res.setHeader("X-RateLimit-Remaining", remaining);

            if (allowed === 1) {
                return next();
            }

            res.setHeader("Retry-After", retryAfter);

            return res.status(429).json({
                status: 429,
                error: "Too Many Requests",
                message: `Rate limit exceeded. Try again in ${retryAfter} seconds.`,
            });
        } catch (error) {
            console.error("Rate Limiter Error:", error);

            // Allow requests if Redis is unavailable
            return next();
        }
    };
};

module.exports = rateLimiter;