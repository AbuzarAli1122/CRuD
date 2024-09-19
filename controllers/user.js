import { request } from "http";
import user from "../models/user-model.js";

//----------------   create Product ----------------------------------

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

//----------------   get All Product ----------------------------------

   export const getUserData= async (req,res)=>{
        try{
            const getuser = await user.find();
            return res.status(200).json({ success : true, getuser});

        }
        catch(err){
           return res.status(500).json({message:err.message});

        }
    }

 //----------------  Get Product by id   ----------------------------------

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
