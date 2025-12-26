import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("mongooDB coonected  successfully");
    } catch (error) {
        console.error(error);
    }
}

export default connectDB