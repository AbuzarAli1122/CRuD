import mongoose from "mongoose";


const shippingDetailSchema = new mongoose.Schema({
    order_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order', 
    required: true 
    },
    customerName:{ 
    type: String, 
    required: true 
    },
    addressLine1:{
    type: String, 
    required: true 
    },
    addressLine2:{
    type: String 
    },
    city:{
    type: String,
    required: true 
    },
    state:{
    type: String, 
    required: true 
    },
    postalCode:{
    type: String, 
    required: true 
    },
    country:{
    type: String, 
    required: true 
    },
    shippingStatus: { 
        type: String, 
        enum: ['pending', 'shipped', 'delivered', 'cancelled'], 
        default: 'pending' 
    },
    shippingDate: { type: Date },
    trackingNumber: { type: Number }
});

const ShippingDetail= mongoose.model("ShippingDetail", shippingDetailSchema);
export default ShippingDetail;
