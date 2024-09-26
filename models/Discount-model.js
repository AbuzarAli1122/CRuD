// models/Discount.js
import mongoose from "mongoose";

const DiscountSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  discountValue: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, 
{ 
    timestamps: true
});
const Discount=mongoose.model("Discount",DiscountSchema)
export default Discount;


