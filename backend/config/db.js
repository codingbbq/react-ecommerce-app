import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB connected ${conn.connection.host}`);
    } catch(e) {
        console.log(`Error ${e.message}`);
        process.exit(1);
    }
};

export default connectDB;