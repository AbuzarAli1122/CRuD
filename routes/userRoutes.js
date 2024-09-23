import express  from "express";
import {
    registerUser,
    loginUser,
    logoutUser
 } from "../controllers/user.js"

const userRoute= express.Router();

userRoute.post("/registeruser", registerUser),
userRoute.post("/login", loginUser),
userRoute.post("/logout",logoutUser)


export default userRoute;

