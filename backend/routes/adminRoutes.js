const express = require('express');
const router = express.Router();
const {
  getDashboardStats,
  getUsers,
  toggleBlockUser,
  deleteUser,
  getSellers,
  approveSeller,
  getProducts,
  toggleProductApproval,
  deleteProduct,
  getOrders,
  getReviews,
  deleteReview,
  getAnalytics,
  getSettings,
  updateSettings
} = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

// All routes require admin authorization
router.use(protect);
router.use(authorize('admin'));

router.get('/stats', getDashboardStats);

router.get('/users', getUsers);
router.put('/users/:id/block', toggleBlockUser);
router.delete('/users/:id', deleteUser);

router.get('/sellers', getSellers);
router.put('/sellers/:id/approve', approveSeller);

router.get('/products', getProducts);
router.put('/products/:id/approve', toggleProductApproval);
router.delete('/products/:id', deleteProduct);

router.get('/orders', getOrders);

router.get('/reviews', getReviews);
router.delete('/reviews/:id', deleteReview);

router.get('/analytics', getAnalytics);

router.get('/settings', getSettings);
router.put('/settings', updateSettings);

module.exports = router;
