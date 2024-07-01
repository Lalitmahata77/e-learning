import dotenv from "dotenv"
import express from "express"
import connectMongoDb from "./config/dbConnect.js"
dotenv.config({path : "server/config/config.env"})
const app = express()

const PORT = process.env.PORT




app.listen(PORT, ()=>{
    connectMongoDb()
    console.log(`server is listening on port ${PORT}`);
})