import mongoose from "mongoose";

export const dbconnection =()=>{
    mongoose.connect("mongodb+srv://saraha874:saraha@cluster0.xnavg3n.mongodb.net/saraha").then(()=>{
        console.log("database connected ......");
    }).catch((err)=>{
        console.log("error in connect");
    })
}