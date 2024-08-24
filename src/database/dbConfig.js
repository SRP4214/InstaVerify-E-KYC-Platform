const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path:'./process.env'});
// const URI = process.env.DB_URI;
// const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority`;
const URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// The mongoose.connect() function now always returns a promise, not a Mongoose instance.
const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};
module.exports = connectDB;