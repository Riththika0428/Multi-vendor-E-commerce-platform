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
// @access  Private/Customer
router.get('/:id', protect, authorize('customer'), async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order) {
      // Ensure the order belongs to the user
      if (order.user._id.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to view this order' });
      }
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
