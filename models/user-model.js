import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    Name:{
        type:String,
        required : true
    },
    userName:{
        type:String,
        required : true,
        unique: true,
    },
    email:{
        type:String,
        required : true,
        
    
    },
    password:{
        type:String,
        required : true,
        
    },
   
    role:{
        type:String,
        enum:["admin", "customer","superAdmin"],
        default:"customer",
    },
    
    resetPasswordToken: {
        type: String
    },   
    resetPasswordExpires: {
        type: Date
    }
},{
    timestamps : true,
})
let user=mongoose.model("user",userSchema);
export default user;