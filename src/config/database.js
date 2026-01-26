const mongoose = require('mongoose');
const logger = require('./logger');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlPArser: true,
            useUnifiedTopology: true,
        })

        logger.info(`MongoDB Connected: ${conn.connection.host}`);

        mongoose.connection.on('error', (err) => {
            logger.error(`MongoDB connection error: ${err}`)
        })

        mongoose.connection.on('disconnected', () => {
            logger.warn('MongoDB diconnected');
        })

        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            process.exit(0);
        })
    } catch (error) {
        logger.error(`Error connecting to MongoDB: ${error.message}`)
    }
}

module.exports = connectDB;