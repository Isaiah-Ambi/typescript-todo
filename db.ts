import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/todo-app';
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error);
    process.exit(1); // Exit process on connection error
  }
};

export default connectDB;
