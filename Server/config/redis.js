const { createClient } = require('redis');
require('dotenv').config();


// we are using db 1 so in redis cli run 'SELECT 1' command
// Create Redis Client
const redisClient = createClient({
    url: process.env.REDIS_URL,
    database: 1
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

redisClient.on('connect', () => {
    console.log('Connected to Redis server successfully!');
});

// Connect to Redis
const connectRedis = async () => {
    try {
        await redisClient.connect();
    } catch (error) {
        console.error('Could not connect to Redis:', error);
    }
};

module.exports = {
    redisClient,
    connectRedis
};
