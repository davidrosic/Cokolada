const mongoose = require('mongoose');
require('dotenv').config();
const URI = process.env.DB_URI;

const uri = URI + "cokoladadb";

const connectDb = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("config::db.js::connectDb\n",error);
        process.exit(1);
    }
};

module.exports = connectDb;