const redisClient = require("../config/redisConfig");
const { v4: uuidv4 } = require("uuid");

const MAX_RETREES = 5;
const INITAL_DELAY = 1000;

/**
 * Publishes a message to the redis server channel with a retry logic
 * Users exponential backoff strategy for retreiving messages
 *
 *  @param {string} message - Message to be published
 * @param {string} channel - Channel to publish the message to.
 * @param {number} retriesLeft - The number of retures left (defaults to MAX_RETRIES)
 * @param {number} delay - The delay in milliseconds (defaults to INITAL_DELAY)
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

const publishMessage = async (
  channel,
  message,
  retriesLeft = MAX_RETREES,
  delay = INITAL_DELAY
) => {
  try {
    const publisherClient = redisClient.duplicate();
    await ensurePublisherConnection(publisherClient);
    const messageId = uuidv4().toString();
    message.id = messageId;
    message.timeStamp = new Date().toISOString();

    console.log(`Publishing message to ${channel}: ${message}`);
    await publisherClient.publish(channel, JSON.stringify(message));

    console.log(
      `Message ${messageId} successfully published to channel "${channel}"`
    );
  } catch (error) {
    console.error(
      `Error publishing message to channel "${channel}": ${error.message}`
    );

    //   check if we have retry attempts left
    if (retriesLeft > 0) {
      // exponential backoff
      const nextDelay = delay * 2;

      console.log(
        `Retrying message publishing to channel "${channel}" in ${nextDelay}ms...`
      );

      //   wait before retrying
      setTimeout(function () {
        publishMessage(channel, message, retriesLeft - 1, nextDelay);
      }, delay);
    } else {
      console.error(
        `Max retries reached for message publishing to channel "${channel}"`
      );
      throw error;
      //   send message to their email address
    }
  }
};

module.exports = {
  publishMessage,
};
