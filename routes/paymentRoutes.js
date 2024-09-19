import express  from "express";
import {
    Postpayment,
    updatepayment,
    deletepayment,
    getPaymentData
    
     
 } from "../controllers/payment.js"

const paymentRoute= express.Router();

paymentRoute.post("/createpayment", Postpayment),
paymentRoute.get( "/getpayment", getPaymentData),


paymentRoute.delete("/deletepayment/:id",deletepayment)
paymentRoute.put("/updatepayment/:id",updatepayment)


export default paymentRoute;

