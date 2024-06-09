// connection to mongoDb via mongoose
import mongoose from "mongoose";

const connectDB = async () => {
    const URI =
      "mongodb+srv://jatinkr131:Jackkr12@cluster0.0u8rys0.mongodb.net/ecommdb?retryWrites=true&w=majority&appName=Cluster0";
    try {
        const conn = await mongoose.connect(URI);
        console.log(`Mongo db connected: ${conn.connection.host}`);
    } catch (error) {
        console.log("Error in connection:", error); 
        process.exit(1);
    }
};

export default connectDB;