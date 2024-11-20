const { EventEmitter } = require("events");
const redisClient = require("../config/redisConfig");

const eventEmitter = new EventEmitter();

/**
 * Subscribes to a Redis channel and listens for messages.
 * Emits events via the EventEmitter for internal handling.
 * @param {string} channel
 */
const subscribeToChannel = async (channel) => {
  try {
    const subscriberClient = redisClient.duplicate();
    await subscriberClient.connect();

    await subscriberClient.subscribe(channel, (message) => {
      try {
        const parsedMessage = JSON.parse(message);
        console.log(`Received message on "${channel}":`, parsedMessage);

        // Emit the event for internal handlers
        eventEmitter.emit(channel, parsedMessage);
      } catch (err) {
        console.error(`Error parsing message on channel "${channel}":`, err);
      }
    });

    console.log(`Successfully subscribed to channel "${channel}"`);
  } catch (error) {
    console.error(`Error subscribing to channel "${channel}":`, error);
  }
};

module.exports = { subscribeToChannel, eventEmitter };
