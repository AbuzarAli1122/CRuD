import express  from "express";
import {
    Postpayment,
    getPaymentByOrderId,
    updatepayment,
    deletepayment,
    getPaymentData
    
     
 } from "../controllers/payment.js"

const paymentRoute= express.Router();

paymentRoute.post("/createpayment", Postpayment),
paymentRoute.get( "/getpayment", getPaymentData),


paymentRoute.get("/getpayment/:id",getPaymentByOrderId),
paymentRoute.delete("/deletepayment/:id",deletepayment)
paymentRoute.put("/updatepayment/:id",updatepayment)


export default paymentRoute;

