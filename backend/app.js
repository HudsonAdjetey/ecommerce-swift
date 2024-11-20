const setUpOrderListener = require("./listeners/orderEvents");
const { subscribeToChannel } = require("./pubsub/subscribe");

const initializeEventHnandling = async function () {
  try {
    await subscribeToChannel("order_updates");
    setUpOrderListener();
  } catch (error) {
    console.error("Error initializing event handling:", error);
  }
};

module.exports = initializeEventHnandling;
