const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

// @desc    Fetch all products with filtering, search, and pagination
// @route   GET /api/products
// @access  Public
router.get('/', async (req, res) => {
  try {
    const pageSize = 12;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          $text: {
            $search: req.query.keyword,
          },
        }
      : {};

    const category = req.query.category ? { category: req.query.category } : {};
    
    // Price filtering
    const minPrice = Number(req.query.minPrice) || 0;
    const maxPrice = Number(req.query.maxPrice) || 10000;
    const priceRange = { price: { $gte: minPrice, $lte: maxPrice } };

    // Rating filtering
    const minRating = Number(req.query.minRating) || 0;
    const ratingFilter = { averageRating: { $gte: minRating } };

    const count = await Product.countDocuments({ ...keyword, ...category, ...priceRange, ...ratingFilter });
    const products = await Product.find({ ...keyword, ...category, ...priceRange, ...ratingFilter })
      .limit(pageSize)
      .skip(pageSize * (page - 1))
      .sort({ createdAt: -1 });

    res.json({ products, page, pages: Math.ceil(count / pageSize) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('vendor', 'name storeName');
    
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
