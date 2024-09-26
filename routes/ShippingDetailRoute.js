import express from "express";
import {
    createShippingDetail,
    getAllShippingDetails,
    getShippingDetailById,
    updateShippingDetail,
    deleteShippingDetail
} from "../controllers/ShippingDetail.js";

const Shippingrouter = express.Router();

Shippingrouter.post('/createShipping',createShippingDetail);
Shippingrouter.get('/getShipping', getAllShippingDetails);
Shippingrouter.get('/getShipping/:id', getShippingDetailById);
Shippingrouter.put('/update/:id', updateShippingDetail );
Shippingrouter.delete('/delete/:id', deleteShippingDetail);

export default Shippingrouter;
