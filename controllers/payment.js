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
    }
 //----------------   get  payment by order id ----------------------------------
  export const getPaymentByOrderId = async (req, res) => {
    try {
        const orderId = req.params.orderId;
       
        const objectId = mongoose.Types.ObjectId(orderId);
        const payments = await Payment.find({ order_id: objectId }).populate("order_id", "payment_id");
        if (!payments || payments.length === 0) {
            return res.status(404).json({ message: "Payments not found for this order" });
        }
        return res.status(200).json(payments);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const updatepayment = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const updatedpayment = await Order.findByIdAndUpdate(paymentId, req.body, { new: true });
        if (!updatedpayment) {
            return res.status(404).json({ message: "payment not found" });
        }
        return res.status(200).json({ message: "payment updated successfully", order: updatedpayment });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deletepayment = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const deletedpayment = await Order.findByIdAndDelete(paymentId);
        if (!deletedpayment) {
            return res.status(404).json({ message: "payment not found" });
        }
        return res.status(200).json({ message: "payment deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
