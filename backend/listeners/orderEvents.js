const { eventEmitter } = require("../pubsub/subscribe");

const setUpOrderListener = () => {
  eventEmitter.on("order_update", (data) => {
    console.log("Order Update Event Triggered:", data);
    // Business logic to process the order update
  });

  eventEmitter.on("order_created", (data) => {
    console.log("Order Created Event Triggered:", data);
    // Business logic to handle a new order
  });
};
module.exports = setUpOrderListener;