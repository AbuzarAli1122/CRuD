// routes/category.js
import express from "express"
import Category from "../models/category-model.js";

const router = express.Router();


 export const addCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newCategory = new Category({
      name,
      description,
    });

    const category = await newCategory.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};


export const getcategory= async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};


export const GetById=  async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return res.status(404).json({ msg: 'Category not found' });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};


export const updatecategory= async (req, res) => {
  const { name, description } = req.body;

  try {
    let category = await Category.findById(req.params.id);
    if (!category){

         return res.status(404).json({ msg: 'Category not found' });
    }
    category.name = name || category.name;
    category.description = description || category.description;

    await category.save();
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};


export const deletecategory= async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
        return res.status(404).json({ msg: 'Category not found' });
    }
    await category.remove();
    res.json({ msg: 'Category removed' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};


