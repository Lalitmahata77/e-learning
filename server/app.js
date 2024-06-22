import express from "express"
const app = express()
import dotenv from "dotenv"
import connetMongoDb from "./config/dbconnect.js"
dotenv.config({path : "server/config/config.env"})
const PORT = process.env.PORT || 5000
app.use(express.json())

app.listen(PORT, ()=>{
    connetMongoDb()
    console.log(`server is listening on port ${PORT}`);
})

