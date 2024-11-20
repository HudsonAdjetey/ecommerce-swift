const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.CONN_STR;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    deprecationErrors: true,
  },
});

const connectDB = async () => {
  try {
    await client.connect();
    if (process.env.NODE_ENV !== "production") {
      console.log("Connected to mongodb server");
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
