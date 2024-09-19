import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    

    order_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true 
    },

    payment_date: { 
    type: Date,
    default: Date.now
    },

    payment_method:{
        type:String,
        required:true,
        enum: ['PayPal', 'Stripe'],

    },

    payment_status: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending' 
    },


    amount_paid: { 
        type: Number,
     required: true
     },
   
}, {
    timestamps: true, 
});

const payment = mongoose.model("payment", paymentSchema);
export default payment;
