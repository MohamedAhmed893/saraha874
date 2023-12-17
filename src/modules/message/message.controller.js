import { messageModel } from "../../../databases/models/message.model.js";
import { AppError } from "../../utils/AppError.js";
import { catchAsyncError } from "../../utils/catchAsyncError.js";



const addMessage =catchAsyncError(async (req,res,next)=>{
    const {message} =req.body
    const {sendTo}=req.params
    const messages=new messageModel({message,sendTo})
    await messages.save()
    res.json({message:"success",messages})
})

const getAllMessage =catchAsyncError(async (req,res,next)=>{
    const messages =await messageModel.find({sendTo:req.user._id})
    !messages && next(new AppError("No Messages",403))
    messages && res.json({message:"success",messages})
})

const deleteMessage =catchAsyncError(async (req,res,next)=>{
    const {id} =req.body
    const message =await messageModel.findByIdAndDelete(id)
    !message && next(new AppError("No Messages",403))
    message && res.json({message:"success",message})
})

export {
    addMessage ,
    getAllMessage ,
    deleteMessage
}