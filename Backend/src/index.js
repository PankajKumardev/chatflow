import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import { connectDB } from "./db/index.js";
import { app,server } from "./utils/socket.js"
import path from "path";

dotenv.config()

const PORT = process.env.PORT || 8000
const __dirname = path.resolve()

app.use(cors({
    origin:process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials:true
}))

app.use(express.json({limit:"10mb"}))
app.use(express.urlencoded({limit:"10mb",extended:true}))
app.use(cookieParser())

// Routes import
import userRouter from "./routes/user.route.js"
import messageRouter from "./routes/message.route.js"

app.use("/api/auth",userRouter)
app.use("/api/messages",messageRouter)

if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../Frontend/dist")))

    app.get("*",(req,res)=>{
        res.sendFile(path.join(__dirname,"../Frontend","dist","index.html"))
    })
}


server.listen(PORT,()=>{
    console.log("Server is listening on the PORT : ",PORT)
    connectDB();
})