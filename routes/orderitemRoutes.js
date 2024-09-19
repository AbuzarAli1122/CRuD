import express  from "express";
import {
    PostorderBy,
    getOrderByuserId,
    getOrderById,
    deleteOrder,
    updateOrder,
    
     
 } from "../controllers/Order.js"

const orderRoute= express.Router();

orderRoute.post("/createOrder", PostorderBy),
orderRoute.get( "/getOrder", getOrderById),
orderRoute.get("/getorder/:id",getOrderByuserId),
orderRoute.delete("/deleteOrder/:id",deleteOrder)
orderRoute.put("/updateOrder/:id",updateOrder)


export default orderRoute;

