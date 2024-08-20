import mongoose from 'mongoose';
import config from './config.js';

 const connectDb = async () => {
    try {
        await mongoose.connect(config.MONGODB_URI);
        console.log(`mongodb Connected ${mongoose.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        setTimeout(connectDb, 5000);
    }
};
export default connectDb
