const { default: mongoose } = require("mongoose");



const connectDB = async () => {
 const URL = process.env.CONN_STR;
 try {
   const conn = await mongoose.connect(URL, {
     // useNewUrlParser: true,
   });
   if (process.env.NODE_ENV == "development") {
     console.log(`MongoDB connected: ${conn.connection.host}`);
   }
 } catch (error) {
   console.log(`Error: ${error.message}`);
   process.exit(1);
 }
};

module.exports = connectDB;
