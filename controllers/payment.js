import mongoose from 'mongoose';
import payment from "../models/payment-model.js";

export const Postpayment = async (req, res) => {
    try {
        const {  order_id, payment_date, payment_method,payment_status,amount_paid } = req.body;

      const newpayment = new payment({
        order_id ,
        payment_date, 
        payment_method,
        payment_status,
        amount_paid
      });
       await newpayment.save();
      return res.status(201).json({ message: "payment  successfully", payment: newpayment });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
    //----------------   get All payment ----------------------------------

    export const getPaymentData= async (req,res)=>{
        try{
            const getpayment = await payment.find();
            return res.status(200).json({ success : true, getpayment});
    
        }
        catch(err){
           return res.status(500).json({message:err.message});
    
        }
    };


    export const updatepayment = async (req, res) => {
        try {
            const paymentId = req.params.id; 
            
            const updatedPayment = await payment.findOneAndUpdate( { order_id: paymentId }, req.body,{ new: true }  );
    
            if (!updatedPayment) {
                return res.status(404).json({ message: "Payment not found for the given order_id" });
            }
    
            return res.status(200).json({ message: "Payment updated successfully", payment: updatedPayment });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    };
    

export const deletepayment = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const deletedpayment = await payment.findByIdAndDelete(paymentId);
        if (!deletedpayment) {
            return res.status(404).json({ message: "payment not found" });
        }
        return res.status(200).json({ message: "payment deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
