import express  from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    sendPasswordResetEmail,
    resetPassword
 } from "../controllers/user.js"
import { authenticateWithToken, authorizeRoles } from "../middleware/usermiddlewear.js";

const userRoute= express.Router();

userRoute.post("/registeruser", registerUser),
userRoute.post("/login", loginUser),
userRoute.post("/logout",logoutUser)



// Route to reset password using the token
userRoute.post('/forgot-password', sendPasswordResetEmail);
userRoute.post('/reset-password/:token',authorizeRoles('admin'), resetPassword);




export default userRoute;

