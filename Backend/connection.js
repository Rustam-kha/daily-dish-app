import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);

        if (mongoose.connection.readyState === 1) {
            console.log("MongoDB connected successfully");
        } else {
            console.log("MongoDB connection state:", mongoose.connection.readyState);
        }

    } catch (error) {
        console.error("MongoDB connection error:", error.message);
        process.exit(1); 
    }
};

export default connectDb;
