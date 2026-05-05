const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const Cart = require('../models/Cart');
const Product = require('../models/Product');

// @desc    Get logged in user's cart
// @route   GET /api/cart
// @access  Private/Customer
router.get('/', protect, authorize('customer'), async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [], totalPrice: 0 });
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Add item to cart or update quantity
// @route   POST /api/cart
// @access  Private/Customer
router.post('/', protect, authorize('customer'), async (req, res) => {
  try {
    const { productId, qty } = req.body;
    
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    
    if (!cart) {
      cart = new Cart({ user: req.user._id, items: [], totalPrice: 0 });
    }

    const existItemIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (existItemIndex > -1) {
      cart.items[existItemIndex].qty = qty;
    } else {
      cart.items.push({
        product: productId,
        qty,
        price: product.price
      });
    }

    // Recalculate total price
    // Note: in a real app, you'd fetch current prices from DB
    let total = 0;
    for (const item of cart.items) {
      const p = await Product.findById(item.product);
      total += p.price * item.qty;
    }
    cart.totalPrice = total;
    
    await cart.save();
    const updatedCart = await Cart.findById(cart._id).populate('items.product');
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private/Customer
router.delete('/:productId', protect, authorize('customer'), async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });
    
    if (cart) {
      cart.items = cart.items.filter(item => item.product.toString() !== req.params.productId);
      
      // Recalculate total price
      let total = 0;
      for (const item of cart.items) {
        const p = await Product.findById(item.product);
        total += p.price * item.qty;
      }
      cart.totalPrice = total;
      
      await cart.save();
      const updatedCart = await Cart.findById(cart._id).populate('items.product');
      res.json(updatedCart);
    } else {
      res.status(404).json({ message: 'Cart not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
