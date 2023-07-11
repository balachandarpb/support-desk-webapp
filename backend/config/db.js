const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`DB connected : ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(`Error : ${error.message}`.red.underline);
    process.exit(1);
  }
};

module.exports = connectDb;
