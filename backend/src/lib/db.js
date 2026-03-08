import mongoose from 'mongoose';
import { ENV } from './env.js';


export const connectDB = async () => {
    try {
        if (!ENV.MONGO_URI) {
            throw new Error('MONGO_URI environment variable is not defined');
        }
        const conn = await mongoose.connect(ENV.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
    
};       


