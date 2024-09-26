import mongoose from "mongoose";


const CategorySchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        enum: ['Men', 'Women', 'Kids'],
        default: 'Men'
    },
    description: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    
}, {
    timestamps: true, 
});

const Catogery = mongoose.model("Catogery", CategorySchema);
export default Catogery;
