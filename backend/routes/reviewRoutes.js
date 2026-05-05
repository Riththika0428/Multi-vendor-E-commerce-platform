const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const Review = require('../models/Review');
const Product = require('../models/Product');
const Order = require('../models/Order');

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private/Customer
router.post('/', protect, authorize('customer'), async (req, res) => {
  try {
    const { rating, comment, productId, orderId } = req.body;

    // 1. Verify user purchased the product in this order
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (order.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const hasProduct = order.orderItems.find(item => item.product.toString() === productId);
    if (!hasProduct) {
      return res.status(400).json({ message: 'You have not purchased this product in this order' });
    }

    // 2. Check if already reviewed
    const alreadyReviewed = await Review.findOne({
      user: req.user._id,
      product: productId,
      order: orderId
    });

    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Product already reviewed for this order' });
    }

    // 3. Create review
    const review = new Review({
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
      product: productId,
      order: orderId
    });

    await review.save();

    // 4. Update Product average rating
    const p = await Product.findById(productId);
    const reviews = await Review.find({ product: productId });
    
    p.numOfReviews = reviews.length;
    p.averageRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;

    await p.save();

    res.status(201).json({ message: 'Review added' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:productId
// @access  Public
router.get('/product/:productId', async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
