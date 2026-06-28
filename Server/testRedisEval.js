const { redisClient, connectRedis } = require('./config/redis');

(async () => {
    await connectRedis();
    try {
        const TOKEN_BUCKET_SCRIPT = `return KEYS[1]`;
        const res = await redisClient.eval(TOKEN_BUCKET_SCRIPT, {
            keys: ['test'],
            arguments: []
        });
        console.log("Success:", res);
    } catch (e) {
        console.error("Error:", e);
    }
    process.exit();
})();
