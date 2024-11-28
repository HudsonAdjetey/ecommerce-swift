const redisClient = require("../config/redisConfig");
const { v4: uuidv4 } = require("uuid");

const MAX_RETRIES = 5;
const INITIAL_DELAY = 1000; // 1 second initial delay for retries

/**
 * Ensures that the Redis publisher connection is open.
 * If not, it will connect the publisher client.
 */
const ensurePublisherConnection = async (redisPublisher) => {
  try {
    if (!redisPublisher.isOpen) {
      await redisPublisher.connect();
    }
  } catch (error) {
    console.error(`Error connecting to Redis publisher: ${error.message}`);
    throw error;
  }
};

/**
 * Publishes a message to the Redis server with a retry mechanism and exponential backoff.
 *
 * @param {string} channel - The Redis channel to publish the message to.
 * @param {Object} message - The message to be published.
 * @param {number} retriesLeft - Number of retry attempts left (defaults to MAX_RETRIES).
 * @param {number} delay - Delay before the next retry in milliseconds (defaults to INITIAL_DELAY).
 */
const publishMessage = async (
  channel,
  message,
  retriesLeft = MAX_RETRIES,
  delay = INITIAL_DELAY
) => {
  try {
    const messageId = uuidv4().toString();
    message.id = messageId;
    message.timeStamp = new Date().toISOString();

    // Ensure the publisher connection is open before publishing the message
    await ensurePublisherConnection(redisClient);

    // Publish the message to the Redis channel
    await redisClient.publish(channel, JSON.stringify(message));

    console.log(
      `Message ${messageId} successfully published to channel "${channel}"`
    );
  } catch (error) {
    console.error(
      `Error publishing message to channel "${channel}": ${error.message}`
    );

    // If retries are left, apply exponential backoff and retry
    if (retriesLeft > 0) {
      const nextDelay = delay * 2; // Exponential backoff

      console.log(
        `Retrying message publishing to channel "${channel}" in ${nextDelay}ms...`
      );

      // Wait for the next delay before retrying
      setTimeout(async () => {
        await publishMessage(channel, message, retriesLeft - 1, nextDelay);
      }, delay);
    } else {
      console.error(
        `Max retries reached for publishing message to channel "${channel}"`
      );
      // Optionally, you can also send an alert or store the failed publish attempt
      throw error;
    }
  }
};

module.exports = {
  publishMessage,
};
