import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({

  productId: {
  type: mongoose.Schema.Types.ObjectId, 
  ref: 'product', 
  required: true
  },

  quantity: { 
  type: Number, 
  required: true
  },
  price: { 
  type: Number,
  required: true 
  },
  total: { 
    type: Number, 
    required: true 
  },
});

const cartSchema = new mongoose.Schema({
  userId: { 
  type: mongoose.Schema.Types.ObjectId, 
  ref: 'user', 
  required: true 
  },
  items: [cartItemSchema],

  totalPrice: { 
  type: Number, 
  required: true, 
  default: 0 },
  status: { 
  type: String,
  enum: ['pending', 'shipped', 'delivered'],
  default: 'delivered' },  
}, { timestamps: true });

export default mongoose.model('Cart', cartSchema);