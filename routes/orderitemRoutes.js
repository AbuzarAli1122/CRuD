import express  from "express";
import {
    PostorderItem,
    getorderItemData,

    getOrderItemByOrderId,
    deleteOrderitem,
    updateOrderItem,
    
    
     
 } from "../controllers/orderitem.js"

const orderitemRoute= express.Router();

orderitemRoute.post("/createOrderitem", PostorderItem),
orderitemRoute.get( "/getOrderitem", getorderItemData),

orderitemRoute.get("/getorderitem/:id",getOrderItemByOrderId),
orderitemRoute.delete("/deleteOrder/:id",deleteOrderitem)
orderitemRoute.put("/updateOrderitem/:id",updateOrderItem)


export default orderitemRoute;

