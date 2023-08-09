const Product = require("../models/Product");
const express = require("express");
const router = express.Router();

// Get All
router.get("/get-all", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json(error);
  }
});

// Create
router.post("/add-product", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).json("Item added successfully");
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update
router.put("/update-product", async (req, res) => {
  try {
    await Product.findByIdAndUpdate(
      {
        _id: req.body.productId,
      },
      req.body
    );
    res.status(200).json("Item updated successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete("/delete-product", async (req, res) => {
  try {
    await Product.findByIdAndDelete({
      _id: req.body.productId,
    });
    res.status(200).json("Item deleted successfully");
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
