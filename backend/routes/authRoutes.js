const express = require('express');
const router = express.Router();
const {
  registerCustomer,
  registerSeller,
  login,
  googleAuth,
  logout,
  getMe,
  updateUserProfile,
  updateUserPassword
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/register/customer', registerCustomer);
router.post('/register/seller', registerSeller);
router.post('/login', login);
router.post('/google', googleAuth);
router.post('/logout', logout);

// Profile endpoint is protected (anyone logged in can access their profile)
router.get('/me', protect, getMe);
router.put('/profile', protect, updateUserProfile);
router.put('/password', protect, updateUserPassword);

// Example of role-restricted route (can be moved to other routers later)
router.get('/admin-only', protect, authorize('admin'), (req, res) => {
  res.status(200).json({ message: 'Admin Data Access Granted' });
});

module.exports = router;
