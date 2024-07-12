import dotenv from "dotenv"
import express from "express"
import connectMongoDb from "./config/dbConnect.js"
import cookieParser from "cookie-parser"
dotenv.config({path : "server/config/config.env"})
const app = express()

const PORT = process.env.PORT
app.use(express.json())
app.use(cookieParser())
import authRoute from "./route/authRoute.js"
import courseRoute from "./route/courseRoute.js"
app.use("/api/v2/", authRoute)
app.use("/api/v2/", courseRoute)
app.listen(PORT, ()=>{
    connectMongoDb()
    console.log(`server is listening on port ${PORT}`);
})