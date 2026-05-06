const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const Wishlist = require('../models/Wishlist');

// @desc    Get user wishlist
// @route   GET /api/wishlist
// @access  Private/Customer
router.get('/', protect, authorize('customer'), async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products');

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user._id, products: [] });
    }

    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Add or remove product from wishlist
// @route   POST /api/wishlist/:productId
// @access  Private/Customer
router.post('/:productId', protect, authorize('customer'), async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
      wishlist = new Wishlist({ user: req.user._id, products: [] });
    }

    const productId = req.params.productId;
    const isExist = wishlist.products.find(p => p.toString() === productId);

    if (isExist) {
        // Remove if exists
        wishlist.products = wishlist.products.filter(p => p.toString() !== productId);
    } else {
        // Add if doesn't exist
        wishlist.products.push(productId);
    }

    await wishlist.save();
    const updatedWishlist = await Wishlist.findById(wishlist._id).populate('products');
    res.json(updatedWishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
