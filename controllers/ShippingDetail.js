import ShippingDetail from "../models/ShippingDetail-model.js";

//-----------Create SHipping Detail---------------------
export const createShippingDetail = async (req, res) => {
    try {
        const shippingDetail = new ShippingDetail(req.body);
        await shippingDetail.save();
        res.status(201).json(shippingDetail);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//--------------------------------------------------

//------Get all shipping details--------------------

export const getAllShippingDetails = async (req, res) => {
    try {
        const shippingDetails = await ShippingDetail.find();
        res.status(200).json(shippingDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//-----------------------------------------------

//-------Get shipping detail by ID-------------------

export const getShippingDetailById = async (req, res) => {
    try {
        const shippingDetail = await ShippingDetail.findById(req.params.id);
        if (!shippingDetail) {
            return res.status(404).json({ message: 'Shipping detail not found' });
        }
        res.status(200).json(shippingDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//---------------------------------------------------

// Update a shipping detail by ID
export const updateShippingDetail = async (req, res) => {
    try {
        const shippingDetail = await ShippingDetail.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        if (!shippingDetail) {
            return res.status(404).json({ message: 'Shipping detail not found' });
        }
        res.status(200).json(shippingDetail);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a shipping detail by ID
export const deleteShippingDetail = async (req, res) => {
    try {
        const shippingDetail = await ShippingDetail.findByIdAndDelete(req.params.id);
        if (!shippingDetail) {
            return res.status(404).json({ message: 'Shipping detail not found' });
        }
        res.status(200).json({ message: 'Shipping detail deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
