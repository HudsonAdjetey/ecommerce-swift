const redisClient = require("../config/redisConfig");

const generateCacheKey = (prefix, id) => `${prefix}:${id}`;

const setCache = async (key, value, ttl = 3600) => {
  try {
    if (ttl <= 0) throw new Error("TTL must be a positive number");
    await redisClient.setEx(key, ttl, JSON.stringify(value));
    console.log(`Set cache for key: ${key}`);
  } catch (error) {
    console.error(`Error setting cache for key: ${key}`, error);
  }
};

const getCache = async (key) => {
  try {
    const cachedValue = await redisClient.get(key);
    if (cachedValue) {
      console.log(`Retrieved cache for key: ${key}`);
      return JSON.parse(cachedValue);
    }
    return null;
  } catch (error) {
    console.error(`Error getting cache for key: ${key}`, error);
  }
};

const deleteCache = async (key) => {
  try {
    await redisClient.del(key);
    console.log(`Deleted cache for key: ${key}`);
  } catch (error) {
    console.error(`Error deleting cache for key: ${key}`, error);
  }
};

module.exports = {
  setCache,
  getCache,
  deleteCache,
  generateCacheKey,
};
