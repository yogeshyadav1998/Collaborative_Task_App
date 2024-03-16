import * as redis from 'redis';

const { REDIS_CONFIG } = require('../config');

export const redisClient = redis.createClient(REDIS_CONFIG);

