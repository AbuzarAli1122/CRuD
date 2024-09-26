import express  from "express";
import {
    
    addCategory,
    getcategory,
    GetById,
    updatecategory,
    deletecategory 
    
     
 } from "../controllers/Category.js"

const CategoryRoute= express.Router();

CategoryRoute.post("/createcategory", addCategory),
CategoryRoute.get( "/getcategory", getcategory),

CategoryRoute.get("/getcategory/:id",GetById),
CategoryRoute.delete("/deletecategory/:id",deletecategory)
CategoryRoute.put("/updatecategory/:id",updatecategory)


export default CategoryRoute;

