import { request } from "http";
import product from "../models/product-model.js";

//----------------   create Product ----------------------------------

export const postProductData= async(req,res)=>{
    try{
            const {productName, productTitle,productDescription,productPrice,user}= req.body;
            const image= req.files;
            const imagePaths = image ? image.map(img => img.path) : [];
             // Validate required fields
        if (!productPrice || isNaN(productPrice)) {
            return res.status(400).json({ message: "Product price is required and should be a valid number." });
        }
        const numericProductPrice = Number(productPrice);
            console.log(productName, productTitle,productDescription,productPrice,user,image);
            
            const productExist=await product.findOne({productName:productName});
            if(productExist){
                return res.status(400).json({message:"product  already exist"});
            }
            
            const productData= new product({
                productName,
                productTitle,
                productDescription,
                productPrice: numericProductPrice,
                user,
                image:imagePaths
            })
            await productData.save();
            return res.status(200).json({ message: "data saved succesfully"})

    }
    catch(error){
        res.status(500).json(error.message);
    }
}
//----------------   get product by user ---------------------------------

export const getProductByUser= async(req,res)=>{
    try{
        const productData= await product.find().populate("user");
        res.status(200).json({success:true , productData })
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

//----------------   get All Product ----------------------------------

   export const getProductData= async (req,res)=>{
        try{
            const getProduct = await product.find();
            return res.status(200).json({ success : true, getProduct});

        }
        catch(err){
           return res.status(500).json({message:err.message});

        }
    }

 //----------------  Get Product by id   ----------------------------------

    export const getProductById  = async( req,res ) =>{
        try{
            const id = req.params.id;
            const getProductId = await product.findById(id);
            if(!getProductId){
                return res.status(404).json({message:"Product not found"});
            }
            return res.status(200).json({success:true, getProductId});
    }
    catch(err){
        return res.status(500).json({message:err.message});
        
    }}

//----------------   Delete Product by id ----------------------------------

export const deleteById = async( req,res ) => {
    try{
        const id = req.params.id;
        const deleteProduct = await product.findByIdAndDelete(id);
        if(!deleteProduct){
            return res.status(404).json({message:"product not found"});
            }
            return res.status(200).json({success:true, message:"product deleted successfully"});
            }
            catch(err){
                return res.status(500).json({message:err.message});
                
    }
}
//----------------   Update Product by id ----------------------------------
export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const updateProduct = await product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updateProduct) {
            return res.status(404).json({ message: "User not found" });
            }
            return res.status(200).json({ success: true, updateProduct });
            }
            catch (err) {
                return res.status(500).json({ message: err.message });
                }

            }


