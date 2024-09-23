import mongoose from "mongoose";


const CategorySchema = new mongoose.Schema({
    
    name:{
        type:String,
        required:true,
        enum: ['Men', 'Women', 'Kids'],
        default: 'Men'
    }
    
}, {
    timestamps: true, 
});

const Catogery = mongoose.model("Catogery", CategorySchema);
export default Catogery;
