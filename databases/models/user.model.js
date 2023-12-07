import mongoose from "mongoose";
import bcrypt from 'bcrypt'
const userSchema =mongoose.Schema({
    name:{
        type:String ,
        trim:true ,
        required:true
    } ,
    email:{
        type:String ,
        unique:true ,
        required:true
    },
    password:{
        type:String ,
        required:true
    } ,
    changePassword:Date

})
userSchema.pre('save',function(){
    this.password=bcrypt.hashSync(this.password, 8);
})
userSchema.pre('findOneAndUpdate', function () {
    if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 8)
 })
 
export const userModel=mongoose.model('user',userSchema)