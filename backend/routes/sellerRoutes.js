const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const Product = require('../models/Product');
const Order = require('../models/Order');
const Transaction = require('../models/Transaction');

// @desc    Get seller dashboard stats
// @route   GET /api/seller/stats
// @access  Private/Seller
router.get('/stats', protect, authorize('seller'), async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({ vendor: req.user._id });
    
    // Find all orders containing this seller's products
    const orders = await Order.find({
      'orderItems.vendor': req.user._id,
      isPaid: true
    });

    const totalOrders = orders.length;
    const pendingOrders = orders.filter(o => o.status !== 'delivered').length;

    // Calculate total revenue for this seller
    let totalRevenue = 0;
    orders.forEach(order => {
      order.orderItems.forEach(item => {
        if (item.vendor?.toString() === req.user._id.toString()) {
          totalRevenue += item.price * item.qty;
        }
      });
    });

    res.json({
      totalProducts,
      totalOrders,
      totalRevenue,
      pendingOrders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get seller sales analytics (daily/weekly)
// @route   GET /api/seller/analytics
// @access  Private/Seller
router.get('/analytics', protect, authorize('seller'), async (req, res) => {
  try {
    const orders = await Order.find({
      'orderItems.vendor': req.user._id,
      isPaid: true
    }).sort({ createdAt: 1 });

    // Group sales by date
    const dailySales = {};
    orders.forEach(order => {
      const date = order.createdAt.toISOString().split('T')[0];
      let sellerAmount = 0;
      order.orderItems.forEach(item => {
        if (item.vendor?.toString() === req.user._id.toString()) {
          sellerAmount += item.price * item.qty;
        }
      });

      if (dailySales[date]) {
        dailySales[date] += sellerAmount;
      } else {
        dailySales[date] = sellerAmount;
      }
    });

    const chartData = Object.keys(dailySales).map(date => ({
      date,
      sales: dailySales[date]
    }));

    res.json(chartData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get seller earnings
// @route   GET /api/seller/earnings
// @access  Private/Seller
router.get('/earnings', protect, authorize('seller'), async (req, res) => {
  try {
    const transactions = await Transaction.find({ seller: req.user._id }).populate('order', '_id createdAt').sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
