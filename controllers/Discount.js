// controllers/discountController.js
import Discount from '../models/Discount-model.js';

//----------Create a new discount-------------------
export const createDiscount = async (req, res) => {
  try {
    const newDiscount = new Discount(req.body);
    await newDiscount.save();
    res.status(201).json(newDiscount);
  } catch (error) {
    res.status(400).json({ message: 'Error creating discount', error });
  }
};

//---------------------------------------------------------------

//----------Get all discounts------------------------------

export const getDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.status(200).json(discounts);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching discounts', error });
  }
};

//------------------------------------------------------

//---------Get a specific discount by ID-----------------

export const getDiscountById = async (req, res) => {
  try {
    const discount = await Discount.findById(req.params.id);
    if (!discount) {
      return res.status(404).json({ message: 'Discount not found' });
    }
    res.status(200).json(discount);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching discount', error });
  }
};

//------------------------------------------------------

//---------------Update a discount---------------------

export const updateDiscount = async (req, res) => {
  try {
    const updatedDiscount = await Discount.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedDiscount) {
      return res.status(404).json({ message: 'Discount not found' });
    }
    res.status(200).json(updatedDiscount);
  } catch (error) {
    res.status(400).json({ message: 'Error updating discount', error });
  }
};
// ---------------------------------------------------

//--------------Delete a discount---------------------
export const deleteDiscount = async (req, res) => {
  try {
    const deletedDiscount = await Discount.findByIdAndDelete(req.params.id);
    if (!deletedDiscount) {
      return res.status(404).json({ message: 'Discount not found' });
    }
    res.status(200).json({ message: 'Discount deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting discount', error });
  }
};
//-----------------------------------------------------------------------