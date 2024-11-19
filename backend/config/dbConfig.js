const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.CONN_STR;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    await client.db("admin").command({ ping: 1 });
    console.log("Connection established");
  } catch (error) {
    console.log("Mongodb Error: ", error);
  } finally {
    await client.close();
  }
};

module.exports = connectDB;
