const redisClient = require("../config/redisConfig");
const fs = require("fs");

const FallbackFile = "../log/fallback.json";

const MAX_RETRIES = 5;
const RETRY_DELAY = 3000;

/**
 * Tries to subscribe to a Redis channel with a retry mechanism.
 * If the subscription fails, it retries a configurable number of times.
 * If all retries fail, it sends an alert and stores the failed subscription.
 *
 * @param {string} channel - The Redis channel to subscribe to.
 * @param {number} retriesLeft - Number of retry attempts left.
 */

const subscribeToChannel = async function (channel, retriesLeft = MAX_RETRIES) {
  try {
    const redisSubscriberClient = redisClient.duplicate();
    await redisSubscriberClient.connect();

    await redisSubscriberClient.subscribe(channel, async function (message) {
      try {
        const parsedMessage = JSON.parse(message);
        console.log(`Received message: ${parsedMessage}`);
        // handle dynamic messages with twillo
      } catch (error) {
        console.error(`Error parsing message on ${channel}: ${error?.message}`);
      }
    });

    console.log(`Subscribed to channel ${channel} successfully`);
  } catch (error) {
    console.error(`Error subscribing to channel ${channel}: ${error?.message}`);
    if (retriesLeft > 0) {
      console.log(
        `Retrying subscription to channel ${channel} in ${RETRY_DELAY}ms...`
      );
      setTimeout(async () => {
        await subscribeToChannel(channel, retriesLeft - 1);
      }, RETRY_DELAY);
    } else {
      console.log("All retries failed. Storing failed subscription.");
      if (process.env !== "production") {
        storedFailedSubscrption();
      }
    }
  }
};

const storedFailedSubscrption = (channel, error) => {
  const failedSubcription = {
    channel,
    error: error.message || error,
    timeStamp: new Date().toISOString(),
  };
  // store failed subscription in database
  fs.appendile(
    FallbackFile,
    JSON.stringify(failedSubcription) + "\n",
    (err) => {
      if (err) {
        console.error("Error storing failed subscription:", err);
      } else {
        console.log("Failed subscription stored successfully");
      }
    }
  );
};

module.exports = subscribeToChannel;
