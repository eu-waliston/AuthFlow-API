const redis = require('redis');
const logger = require('./logger');

class RedisClient {

    constructor() {
        this.client = null;
        this.isConnected = false;
    }

    async connect() {
        try {
            this.client = redis.createClient({
                socket: {
                    host: process.env.REDIST_HOST || 'localhost',
                    port: process.env.REDIST_PORT || 6379,
                    reconnectStrategy: (retries) => {
                        if (retries > 10) {
                            logger.error('Too many attemps to reconnect to Redis')
                            return new Error('Too many retries');
                        }
                        return Math.min(retries * 100, 3000);
                    },
                },
                password: process.env.REDIS_PASSWORD || null,
            })

            this.client.on('error', (err) => {
                logger.error(`Redis error: ${err.message}`);
                this.isConnected = false;
            });

            this.client.on('connect', () => {
                logger.info('Redis connected');
                this.isConnected = true;
            });

            this.client.on('reconnecting', () => {
                logger.info('Redis reconnecting...')
            });

            this.client.on('end', () => {
                logger.warn('Redis disconnected');
                this.isConnected = false;
            })

            await this.client.connect();
        } catch (error) {
            logger.error(`Failed to connect to Redis: ${error.message}`);
            throw error;
        }
    }

    async get(key) {
        try {
            return await this.client.get(key);
        } catch (error) {
            logger.error(`Redis GET error: ${error.message}`);
            return null;
        }
    }

    async set(key, value, expiration = null) {
        try {
            if (expiration) {
                await this.client.setEx(key, expiration, value);
            } else {
                await this.client.set(key, value);
            }
            return true;
        } catch (error) {
            logger.error(`Redis SET error: ${error.message}`);
            return false;
        }
    }

    async del(key) {
        try {
            await this.client.del(key);
            return true;
        } catch (error) {
            logger.error(`Redis DEL error: ${error.message}`);
            return false;
        }
    }

    async exists(key) {
        try {
            return await this.client.exists(key);
        } catch (error) {
            logger.error(`Redis EXISTS error: ${error.message}`);
            return 0;
        }
    }

    async incr(key) {
        try {
            return await this.client.incr(key);
        } catch (error) {
            logger.error(`Redis INCR error: ${error.message}`);
            return null;
        }
    }

    async sendCommand(args) {
        try {
            return await this.client.sendCommand(args);
        } catch (error) {
            logger.error(`Redis command error: ${error.message}`);
            throw error;
        }
    }

    async disconnect() {
        try {
            await this.client.quit();
            this.isConnected = false;
            logger.info('Redis disconnected gracefully');
        } catch (error) {
            logger.error(`Error disconnecting Redis: ${error.message}`)
        }
    }
}

const redisClient = new RedisClient();

module.exports = redisClient;