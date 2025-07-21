const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Failed to get products' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ message: 'Failed to get product' });
  }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ 
      category: req.params.category, 
      isActive: true 
    }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Get products by category error:', error);
    res.status(500).json({ message: 'Failed to get products' });
  }
});

// Search products
router.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const products = await Product.find({
      isActive: true,
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error('Search products error:', error);
    res.status(500).json({ message: 'Failed to search products' });
  }
});

module.exports = router;