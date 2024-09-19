import express  from "express";
import {
    postUserData,
    getUserData,
    getUserById,
     deleteById,
     updateUser,
 } from "../controllers/user.js"

const userRoute= express.Router();

userRoute.post("/createuser", postUserData),
userRoute.get( "/get", getUserData),
userRoute.get("/get/:id",getUserById),
userRoute.delete("/deleteUserById/:id",deleteById)
userRoute.put("/updateUser/:id",updateUser)


export default userRoute;

