import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
    order_id: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 

        },

    product_Id: {

        type: mongoose.Schema.Types.ObjectId,
        ref: "product", 
        required: true,

        },

    orderItem_id:
    {
        type: String,
        required: true,
        unique: true 

    },
    quantity:
    {
        type: Number,
        required: true,
        min: 1,
        max:100
    },
    price:
    {
        type:Number,
        required: true

    },

    
}, {
    timestamps: true, 
});

const OrderItem = mongoose.model("OrderItem", orderItemSchema);
export default OrderItem;
