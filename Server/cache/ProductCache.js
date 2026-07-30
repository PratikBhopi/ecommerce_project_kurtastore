const { redisClient } = require('../config/redis');

const CACHE_TTL = 300; // 5 minutes

exports.getProductsCache = async (params, fetchCallback) => {
    const { page = 1, limit = 12, search = '', sort = 'All' } = params;
    // Create a deterministic cache key based on query parameters
    const cacheKey = `cache:products:page=${page}:limit=${limit}:search=${search}:sort=${sort}`;

    try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }
    } catch (err) {
        console.error('Redis GET Error:', err);
        // Fallthrough on error to fetch from DB
    }

    // Execute the database query callback
    const data = await fetchCallback();

    try {
        if (data && data.status === 200) {
            await redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(data));
        }
    } catch (err) {
        console.error('Redis SET Error:', err);
    }

    return data;
};

exports.getProductByIdCache = async (productID, fetchCallback) => {
    const cacheKey = `cache:product:${productID}`;

    try {
        const cachedData = await redisClient.get(cacheKey);
        if (cachedData) {
            return JSON.parse(cachedData);
        }
    } catch (err) {
        console.error('Redis GET Error:', err);
    }

    const data = await fetchCallback();

    try {
        if (data && data.status === 200) {
            await redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(data));
        }
    } catch (err) {
        console.error('Redis SET Error:', err);
    }

    return data;
};

exports.invalidateProductCache = async () => {
    try {
        // Use KEYS to find all product-related cache entries
        // In a very large scale production system, SCAN should be used instead of KEYS
        const keys = await redisClient.keys('cache:product*');
        if (keys.length > 0) {
            await redisClient.del(keys);
            console.log(`Invalidated ${keys.length} product cache entries`);
        }
    } catch (err) {
        console.error('Redis Invalidation Error:', err);
    }
};
