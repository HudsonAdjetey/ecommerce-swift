const redisClient = require("../config/redisConfig");
const fs = require("fs").promises;

const FallbackFile = "../logs/fallback.json";
const MAX_RETRIES = 5;
const RETRY_DELAY = 3000;

// A single Redis subscriber client that will be reused across subscriptions
let redisSubscriberClient;

/**
 * Ensures that the Redis subscriber connection is open.
 * Re-uses the same connection for all subscriptions.
 */
const ensurePublisherConnection = async () => {
  try {
    // If the subscriber client is not created, create it
    if (!redisSubscriberClient) {
      redisSubscriberClient = redisClient.duplicate();
    }

    // Check if the client is connected, if not, connect it
    if (!redisSubscriberClient.isOpen) {
      await redisSubscriberClient.connect();
    }
  } catch (error) {
    console.error(`Error connecting to Redis publisher: ${error.message}`);
    throw error;
  }
};

/**
 * Subscribes to a Redis channel with retry logic. If the subscription fails,
 * it retries up to a set number of times and stores the failed subscription if
 * all retries fail.
 *
 * @param {string} channel - The Redis channel to subscribe to.
 * @param {number} retriesLeft - Number of retry attempts left.
 */
const subscribeToChannel = async (channel, retriesLeft = MAX_RETRIES) => {
  try {
    // Ensure the Redis subscriber connection is open
    await ensurePublisherConnection();

    // Subscribe to the specified channel
    await redisSubscriberClient.subscribe(channel, async (message) => {
      try {
        const parsedMessage = JSON.parse(message);
        console.log(`Received message on channel "${channel}":`, parsedMessage);
      } catch (error) {
        console.error(
          `Error parsing message on channel "${channel}": ${error.message}`
        );
      }
    });

    console.log(`Successfully subscribed to channel "${channel}"`);
  } catch (error) {
    console.error(
      `Error subscribing to channel "${channel}": ${error.message}`
    );

    // If there are retries left, attempt to subscribe again after a delay
    if (retriesLeft > 0) {
      console.log(
        `Retrying subscription to channel "${channel}" in ${RETRY_DELAY}ms...`
      );
      setTimeout(async () => {
        await subscribeToChannel(channel, retriesLeft - 1);
      }, RETRY_DELAY);
    } else {
      // If all retries fail, store the failed subscription and alert
      console.log(
        `All retries failed for channel "${channel}". Storing failed subscription.`
      );
      await storeFailedSubscription(channel, error);
    }
  }
};

/**
 * Stores the failed subscription attempt in a fallback file (for non-production environments).
 *
 * @param {string} channel - The Redis channel that failed to subscribe.
 * @param {Error} error - The error that occurred during subscription.
 */
const storeFailedSubscription = async (channel, error) => {
  const failedSubscription = {
    channel,
    error: error.message || error,
    timestamp: new Date().toISOString(),
  };

  try {
    // Only store failed subscriptions in non-production environments
    if (process.env.NODE_ENV !== "production") {
      await fs.appendFile(
        FallbackFile,
        JSON.stringify(failedSubscription) + "\n",
        {
          encoding: "utf-8",
        }
      );
      console.log("Failed subscription stored successfully");
    }
  } catch (fileError) {
    console.error("Error storing failed subscription:", fileError);
  }
};

module.exports = subscribeToChannel;
