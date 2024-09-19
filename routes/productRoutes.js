import express  from "express";
import {
    postProductData,
    getProductData,
    getProductById,
    deleteById,
    updateProduct,
    getProductByUser
     
 } from "../controllers/Product.js"

const productRoute= express.Router();

productRoute.post("/createproduct", postProductData),
productRoute.get( "/getproduct", getProductData),
productRoute.get("/getproduct/:id",getProductById),
productRoute.delete("/deleteProductById/:id",deleteById)
productRoute.put("/updateProduct/:id",updateProduct)

productRoute.get("/getProductByUser",getProductByUser)



export default productRoute;

