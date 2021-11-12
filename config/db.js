const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ticketing');
    if (conn) console.log("DB connected");
    else console.log("Db not connected");
};

module.exports = connectDB;