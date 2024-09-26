import { request } from "http";
import user from "../models/user-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import crypto from 'crypto';

 dotenv.config()
            
        
//  -------------------register a user --------------------------------------------------
export const registerUser=async(req,res)=>{

  try {
    let Userdata=req.body;
  
    let isEmailExisted= await user.findOne({email:Userdata.email});
    if(isEmailExisted){
      return res.status(400).json({message:"Email already exists"})
      }
    const hashedPassword=await bcrypt.hash(Userdata.password,10);
    Userdata.password=hashedPassword
    const User=await user.create(Userdata);
    return res.json({message:"User created successfully",User});   
    } 
    catch (error) {
          
      res.status(500).json(error.message)  
            
    }
    }
// --------------------------------------------------------------------------------------------------------- 

//---------------------login api with jwt-----------------------------------------------------------------
export const loginUser= async(req,res)=>{
    try {
        let Userdata=req.body;
        let User=await user.findOne({email:Userdata.email});
            if(!User){
              return res.status(400).json({message:"Invalid email or password"})
              }

         const isValidPassword=await bcrypt.compare(Userdata.password,User.password);
            if(!isValidPassword){
              return res.status(400).json({message:"password not matched"})
              }
                //token generation by jwt
        const token=await jwt.sign({id:User.id,role:User.role},process.env.PRIVATE_KEY,{expiresIn:"10m"});
                 //cookies
        res.cookie("jwt",token,{httpOnly:true,secure:true,maxAge:5*60*60*24})
        return res.status(200).json({success:true,message:"logged in successfully",Userdata,token:token,})
        }
        catch(error){
            res.status(500).json(error.message)
              }
            }
//-------------------------------------------------------------------------------------------------            
//-------------------logout api -----------------------------------------------------------
export const logoutUser=async(req,res)=>{
   try {
      res.clearCookie("jwt");
      return res.status(200).json({message :"logged out successfully"})
      }catch(error){
        return res.status(500).json(error.message)
              }
            }
// -----------------------------------------------------------------------------------------
export const sendPasswordResetEmail = async (req, res) => {
  try {
      const { email } = req.body;
      const User = await user.findOne({ email });
          
       if (!User) {
          return res.status(400).json({ message: 'User with this email does not exist' });
      }
          
      const resetToken = crypto.randomBytes(20).toString('hex');
                  
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
          
      await user.save();
          
      const resetUrl = `http://${req.headers.host}/reset-password/${resetToken}`;
          
      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
          },
      });
          
      const mailOptions = {
          to: user.email,
          from: process.env.EMAIL_USER,
          subject: 'Password Reset',
          text: `You are receiving this because you requested a password reset.\n\n
                  Please click the following link or paste it into your browser to reset your password:\n\n
                  ${resetUrl}\n\n
                  If you did not request this, ignore this email and your password will remain unchanged.\n`
      };
          
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Password reset email sent successfully.' });
      } 
      catch (error) {
          res.status(500).json({ message: error.message });
      }
  };
          
// ------------------------- Reset password----------------------------------
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;
          
        const User = await user.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() } 
        });
          
        if (!User) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }
          
              
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        User.password = hashedPassword;
          
        User.resetPasswordToken = undefined;
        User.resetPasswordExpires = undefined;
          
        await User.save();
        res.status(200).json({ message: 'Password has been updated successfully' });
              } catch (error) {
                  res.status(500).json({ message: error.message });
              }
          };           

            