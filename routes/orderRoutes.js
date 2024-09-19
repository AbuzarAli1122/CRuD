import express  from "express";
import {
    PostorderBy,
    getOrderByuserId,
    deleteOrder,
    updateOrder,
    getorderData,
    
     
 } from "../controllers/Order.js"

const orderRoute= express.Router();

orderRoute.post("/createOrder", PostorderBy),
orderRoute.get( "/getOrder", getorderData),

orderRoute.get("/getOrder/:id",getOrderByuserId),
orderRoute.delete("/deleteOrder/:id",deleteOrder)
orderRoute.put("/updateOrder/:id",updateOrder)


export default orderRoute;

