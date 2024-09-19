import express  from "express";
import {
    PostorderItem,
    getOrderItemByuserId,
    deleteOrder,
    updateOrder,
    getOrderitemById
    
     
 } from "../controllers/orderitem.js"

const orderitemRoute= express.Router();

orderitemRoute.post("/createOrderitem", PostorderItem),
orderitemRoute.get( "/getOrder", getOrderitemById),

orderitemRoute.get("/getorderitem/:id",getOrderItemByuserId),
orderitemRoute.delete("/deleteOrder/:id",deleteOrder)
orderitemRoute.put("/updateOrder/:id",updateOrder)


export default orderRoute;

