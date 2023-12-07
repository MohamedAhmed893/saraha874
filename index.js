import express from "express";
import { dbconnection } from "./databases/dbconnection.js";
import userRouter from "./src/modules/user/user.router.js";
import { AppError } from "./src/utils/AppError.js";
import messageRouter from "./src/modules/message/message.router.js";
import cors from 'cors'
const app =express()

app.use(express.json())
app.use(cors())
app.use('/users',userRouter)
app.use('/message',messageRouter)
app.use("*",(req,res,next)=>{
    next(new AppError("page Not Found "+req.originalUrl ,404))
})
app.use((err,req,res,next)=>{
    let code =err.statusCode || 401
    res.status(code).json({message:err.message ,statusCode:err.statusCode})
})
dbconnection()
app.listen(process.env.PORT||3004,()=>{
    console.log("server is running ......");
})