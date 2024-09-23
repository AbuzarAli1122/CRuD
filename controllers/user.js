import { request } from "http";
import user from "../models/user-model.js";

//----------------   create user ----------------------------------
/*
export const postUserData= async(req,res)=>{
    try{
            const {Name, userName ,email,password}= req.body;
            console.log(Name, userName ,email,password);
            
            const userExist=await user.findOne({userName:userName});
            if(userExist){
                return res.status(400).json({message:"user  already exist"});
            }
            
            const userData= new user({
                Name, 
                userName,
                email,
                password
            })
            await userData.save();
            return res.status(200).json({ message: "data saved succesfully"})

    }
    catch(error){
        res.status(500).json(error.message);
    }
}

//----------------   get All user ----------------------------------

   export const getUserData= async (req,res)=>{
        try{
            const getuser = await user.find();
            return res.status(200).json({ success : true, getuser});

        }
        catch(err){
           return res.status(500).json({message:err.message});

        }
    }

 //----------------  Get user by id   ----------------------------------

    export const getUserById  = async( req,res ) =>{
        try{
            const id = req.params.id;
            const getUserId = await user.findById(id);
            if(!getUserId){
                return res.status(404).json({message:"User not found"});
            }
            return res.status(200).json({success:true, getUserId});
    }
    catch(err){
        return res.status(500).json({message:err.message});
        
    }}

//----------------   Delete Product by id ----------------------------------

export const deleteById = async( req,res ) => {
    try{
        const id = req.params.id;
        const deleteUser = await user.findByIdAndDelete(id);
        if(!deleteUser){
            return res.status(404).json({message:"User not found"});
            }
            return res.status(200).json({success:true, message:"User deleted successfully"});
            }
            catch(err){
                return res.status(500).json({message:err.message});
                
    }
}
//----------------   Update Product by id ----------------------------------
export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const updateUser = await user.findByIdAndUpdate(id, req.body, { new: true });
        if (!updateUser) {
            return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({ success: true, updateUser });
            }
            catch (err) {
                return res.status(500).json({ message: err.message });
                }

            }

            */


            import bcrypt from "bcryptjs"
            import jwt from "jsonwebtoken"
            import dotenv from "dotenv"
            dotenv.config()
            
            export const registerUser=async(req,res)=>{
            try {
              let Userdata=req.body
              let isEmailExisted= await user.findOne({email:Userdata.email});
              if(isEmailExisted){
                return res.status(400).json({message:"Email already exists"})
              }
              const hashedPassword=await bcrypt.hash(Userdata.password,10);
              Userdata.password=hashedPassword
              const User=await user.create(Userdata);
             return res.json({message:"User created successfully",User});
            
            } catch (error) {
              res.status(500).json(error.message)  
            }
            }
            
            //login api with jwt
            export const loginUser=async(req,res)=>{
              try {
                // data from  body
                let Userdata=req.body;
                let User=await user.findOne({email:Userdata.email});
                // if user not existed 
                if(!User){
                  return res.status(400).json({message:"Invalid email or password"})
                }
                
                const isValidPassword=await bcrypt.compare(Userdata.password,User.password);
                if(!isValidPassword){
                  return res.status(400).json({message:"password not matched"})
                }
                //token generation by jwt
                const token=await jwt.sign({id:user.id,role:user.role},process.env.PRIVATE_KEY,{expiresIn:"10m"});
                 //cookies
                 res.cookie("jwt",token,{httpOnly:true,secure:true,maxAge:5*60*60*24})
                return res.status(200).json({success:true,message:"logged in successfully",Userdata,token:token,})
            
              }catch(error){
                res.status(500).json(error.message)
            
              }
            }
            
            //logout api 
            export const logoutUser=async(req,res)=>{
              try {
                res.clearCookie("jwt");
                return res.status(200).json({message :"logged out successfully"})
              }catch(error){
            return res.status(500).json(error.message)
              }
            }
            

            