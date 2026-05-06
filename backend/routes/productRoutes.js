const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { protect, authorize } = require('../middleware/authMiddleware');

// @desc    Get logged in seller products
// @route   GET /api/products/seller
// @access  Private/Seller
router.get('/seller', protect, authorize('seller'), async (req, res) => {
  try {
    const products = await Product.find({ vendor: req.user._id }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Seller
router.post('/', protect, authorize('seller'), async (req, res) => {
  try {
    const { name, price, description, images, category, stock } = req.body;

    const product = new Product({
      name,
      price,
      description,
      images,
      category,
      stock,
      vendor: req.user._id,
      averageRating: 0,
      numOfReviews: 0,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Seller
router.put('/:id', protect, authorize('seller'), async (req, res) => {
  try {
    const { name, price, description, images, category, stock, isActive } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      if (product.vendor.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      product.name = name || product.name;
      product.price = price || product.price;
      product.description = description || product.description;
      product.images = images || product.images;
      product.category = category || product.category;
      product.stock = stock !== undefined ? stock : product.stock;
      product.isActive = isActive !== undefined ? isActive : product.isActive;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Seller
router.delete('/:id', protect, authorize('seller'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      if (product.vendor.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'User not authorized' });
      }

      await product.deleteOne();
      res.json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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
