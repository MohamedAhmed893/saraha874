import mongoose from "mongoose";

const messageSchema =mongoose.Schema({
 message:String ,
 sendTo:{
    type:mongoose.Types.ObjectId ,
    ref:'user' ,
    require:true
 }

},{timestamps:true})

export const messageModel=mongoose.model('message',messageSchema)