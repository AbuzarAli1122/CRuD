import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true 
        },

    
    order_date: { 
    type: Date,
    default: Date.now

    },

    status: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending' 
        },


    total_amount: { 
        type: Number,
     required: true
     },
    discount_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
       
       },
}, {
    timestamps: true, 
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
