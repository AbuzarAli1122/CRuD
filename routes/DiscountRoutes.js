// routes/discountRoutes.js
import express from "express";
import {
    createDiscount,
    getDiscounts,
    getDiscountById,
    updateDiscount,
    deleteDiscount
} from "../controllers/Discount.js";
const Discountrouter = express.Router();

Discountrouter.post('/createDiscount', createDiscount);
Discountrouter.get('/getDiscount', getDiscounts);
Discountrouter.get('/getDiscount/:id',getDiscountById);
Discountrouter.put('/updateDiscount/:id', updateDiscount);
Discountrouter.delete('/deleteDiscount/:id', deleteDiscount);

export default Discountrouter;