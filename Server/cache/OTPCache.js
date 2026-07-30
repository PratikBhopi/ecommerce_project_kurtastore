const { redisClient } = require('../config/redis');

// Key prefixes
const OTP_COOLDOWN_KEY = (userId) => `otp:cooldown:${userId}`;       // prevent OTP spam
const OTP_ATTEMPT_KEY  = (userId) => `otp:attempts:${userId}`;       // track failed verify attempts
const OTP_VERIFIED_KEY = (userId) => `otp:verified:${userId}`;       // mark OTP as already used

const OTP_COOLDOWN_TTL  = 60;        // seconds before user can request another OTP
const OTP_ATTEMPT_LIMIT = 5;         // max wrong OTP attempts before lockout
const OTP_LOCKOUT_TTL   = 10 * 60;  // 10 minutes lockout after exhausting attempts
const OTP_VERIFIED_TTL  = 15 * 60;  // verified flag lives 15 min (matches order window)

/**
 * requestMail idempotency guard.
 * Returns true if the user is still in cooldown (block the request).
 * Returns false and sets a cooldown if they are allowed to proceed.
 */
exports.isInCooldown = async (userId) => {
    try {
        const key = OTP_COOLDOWN_KEY(userId);
        const existing = await redisClient.get(key);
        if (existing) return true;

        // Set cooldown — NX ensures no race condition overwrites
        await redisClient.set(key, '1', { EX: OTP_COOLDOWN_TTL, NX: true });
        return false;
    } catch (err) {
        console.error('Redis OTP cooldown check error:', err);
        return false; // fail open so users aren't blocked on Redis outage
    }
};

/**
 * TTL remaining on the cooldown key (for informative error messages).
 */
exports.getCooldownTTL = async (userId) => {
    try {
        return await redisClient.ttl(OTP_COOLDOWN_KEY(userId));
    } catch {
        return OTP_COOLDOWN_TTL;
    }
};

/**
 * Check if user is locked out due to too many wrong attempts.
 */
exports.isLockedOut = async (userId) => {
    try {
        const attempts = await redisClient.get(OTP_ATTEMPT_KEY(userId));
        return attempts !== null && parseInt(attempts) >= OTP_ATTEMPT_LIMIT;
    } catch (err) {
        console.error('Redis OTP lockout check error:', err);
        return false;
    }
};

/**
 * Increment failed attempt counter. Locks the user out after OTP_ATTEMPT_LIMIT failures.
 * Returns the number of attempts remaining.
 */
exports.recordFailedAttempt = async (userId) => {
    try {
        const key = OTP_ATTEMPT_KEY(userId);
        const attempts = await redisClient.incr(key);

        if (attempts === 1) {
            // First failure — start the lockout window TTL
            await redisClient.expire(key, OTP_LOCKOUT_TTL);
        }

        return Math.max(OTP_ATTEMPT_LIMIT - attempts, 0);
    } catch (err) {
        console.error('Redis OTP attempt record error:', err);
        return 0;
    }
};

/**
 * Clear attempt counter on successful verification.
 */
exports.clearAttempts = async (userId) => {
    try {
        await redisClient.del(OTP_ATTEMPT_KEY(userId));
    } catch (err) {
        console.error('Redis OTP attempt clear error:', err);
    }
};

/**
 * Mark OTP as verified so it can't be replayed.
 */
exports.markVerified = async (userId) => {
    try {
        await redisClient.set(OTP_VERIFIED_KEY(userId), '1', { EX: OTP_VERIFIED_TTL });
    } catch (err) {
        console.error('Redis OTP mark verified error:', err);
    }
};

/**
 * Check if OTP was already successfully verified (replay prevention).
 */
exports.isAlreadyVerified = async (userId) => {
    try {
        const val = await redisClient.get(OTP_VERIFIED_KEY(userId));
        return val !== null;
    } catch (err) {
        console.error('Redis OTP verified check error:', err);
        return false;
    }
};

/**
 * Clean up all OTP-related keys for a user (call after order is placed).
 */
exports.clearAllOtpKeys = async (userId) => {
    try {
        await redisClient.del([
            OTP_COOLDOWN_KEY(userId),
            OTP_ATTEMPT_KEY(userId),
            OTP_VERIFIED_KEY(userId),
        ]);
    } catch (err) {
        console.error('Redis OTP cleanup error:', err);
    }
};
