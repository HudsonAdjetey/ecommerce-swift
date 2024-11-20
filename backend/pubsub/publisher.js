const redisClient = require("../config/redisConfig");

const redisPublisher = redisClient.duplicate();

const publisher = async (channel, userId, messageContent) => {
  const message = JSON.stringify({
    userId,
    message: messageContent,
    timestamp: new Date().toISOString(),
  });

  try {
    if (!redisPublisher.isOpen) {
      await redisPublisher.connect();
    }

    await redisPublisher.publish(channel, message);
    console.log(`Published message to channel "${channel}": ${message}`);
  } catch (error) {
    console.error("Error publishing message:", error);
  }
};

module.exports = publisher;
