import mongoose from "mongoose";

const connectMongoDb = async() =>{
    try {
        const cnn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB connected: ${cnn.connection.host}`);
    } catch (error) {
        console.error(`Error connection to mongoDB: ${error.message}`);
		process.exit(1);
    }

}
export default connectMongoDb