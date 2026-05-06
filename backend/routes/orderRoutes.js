const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const stripe = process.env.STRIPE_SECRET_KEY 
  ? require('stripe')(process.env.STRIPE_SECRET_KEY)
  : { checkout: { sessions: { create: () => { throw new Error('Stripe Secret Key is missing'); } } } };

// @desc    Create new order and Stripe session
// @route   POST /api/orders
// @access  Private/Customer
router.post('/', protect, authorize('customer'), async (req, res) => {
  try {
    const { orderItems, shippingAddress, itemsPrice, shippingPrice, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      itemsPrice,
      shippingPrice,
      totalPrice,
      status: 'pending'
    });

    const createdOrder = await order.save();

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: orderItems.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: Math.round(item.price * 100), // Stripe uses cents
        },
        quantity: item.qty,
      })),
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/orders/success?orderId=${createdOrder._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/orders/cancel?orderId=${createdOrder._id}`,
      metadata: {
        orderId: createdOrder._id.toString()
      }
    });

    res.status(201).json({ order: createdOrder, url: session.url });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update order to paid (This would ideally be done via Stripe Webhook)
// @route   PUT /api/orders/:id/pay
// @access  Private/Customer
router.put('/:id/pay', protect, authorize('customer'), async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.status = 'paid';
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      
      // CREATE TRANSACTIONS FOR SELLERS
      // Group order items by vendor
      const vendorSales = {};
      order.orderItems.forEach(item => {
        const vendorId = item.vendor?.toString();
        if (vendorId) {
          if (!vendorSales[vendorId]) {
            vendorSales[vendorId] = 0;
          }
          vendorSales[vendorId] += item.price * item.qty;
        }
      });

      const Transaction = require('../models/Transaction');
      const commissionRate = 0.1; // 10% admin commission

      for (const vendorId in vendorSales) {
        const amount = vendorSales[vendorId];
        const commission = amount * commissionRate;
        const sellerEarnings = amount - commission;

        await Transaction.create({
          order: order._id,
          seller: vendorId,
          amount,
          commission,
          sellerEarnings,
          status: 'pending' // Usually becomes 'paid' when platform transfers to seller
        });
      }

      // Clear cart after payment
      await Cart.findOneAndDelete({ user: req.user._id });

      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/my
// @access  Private/Customer
router.get('/my', protect, authorize('customer'), async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private/Customer/Seller
router.get('/:id', protect, authorize('customer', 'seller'), async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
      // If customer, ensure it's their order
      if (req.user.role === 'customer' && order.user._id.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to view this order' });
      }

      // If seller, ensure they have at least one product in this order
      if (req.user.role === 'seller') {
        const hasProduct = order.orderItems.some(item => item.vendor?.toString() === req.user._id.toString());
        if (!hasProduct) {
          return res.status(403).json({ message: 'Not authorized to view this order' });
        }
      }

      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get orders for a specific seller
// @route   GET /api/orders/seller
// @access  Private/Seller
router.get('/seller', protect, authorize('seller'), async (req, res) => {
  try {
    // Find orders that contain products from this seller
    const orders = await Order.find({
      'orderItems.vendor': req.user._id
    }).populate('user', 'name email').sort({ createdAt: -1 });

    // Filter orderItems to only show this seller's products (optional but better)
    const sellerOrders = orders.map(order => {
       const filteredItems = order.orderItems.filter(item => item.vendor?.toString() === req.user._id.toString());
       return {
         ...order.toObject(),
         orderItems: filteredItems
       };
    });

    res.json(sellerOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Seller
router.put('/:id/status', protect, authorize('seller'), async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      // Basic check: at least one item in the order should belong to this seller
      const hasSellerProduct = order.orderItems.some(item => item.vendor?.toString() === req.user._id.toString());
      
      if (!hasSellerProduct) {
        return res.status(401).json({ message: 'Not authorized to update this order' });
      }

      order.status = req.body.status || order.status;
      
      if (req.body.status === 'delivered') {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
      }

      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
