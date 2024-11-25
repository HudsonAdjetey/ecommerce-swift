const subscribeToChannel = require("./pubsub/subscriber");

/**
 * Initializes subscribers for the provided channels.
 * This can be extended to subscribe to multiple channels.
 *
 * @param {Array} channels - List of Redis channels to subscribe to.
 */
const initializeSubscribers = async function (
  channels = [
    "create_order",
    "review_created",
    "reviews_retrieved",
    "review_deleted",
    "get_order",
    "cart_updated",
    "get_cart",
    "order_updated",
    "order_deleted",
  ]
) {
  try {
    console.log("Initializing subscribers...");

    for (const channel of channels) {
      try {
        await subscribeToChannel(channel);
        console.log(`Successfully subscribed to channel: ${channel}`);
      } catch (error) {
        console.error(
          `Error subscribing to channel "${channel}": ${error.message}`
        );
      }
    }

    console.log("All subscribers initialized.");
  } catch (error) {
    console.error("Error initializing event handling:", error);
    // Optionally, send an alert if initializing subscribers fails
  }
};

module.exports = initializeSubscribers;
