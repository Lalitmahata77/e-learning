import mongoose from "mongoose";

const connetMongoDb = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`mongoDb connected ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error to connect mongoDb ${error.message}`);
        process.exit(1)
    }

}

export default connetMongoDb