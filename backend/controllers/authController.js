const User = require('../models/User');
const generateTokenAndSetCookie = require('../utils/generateToken');
const { OAuth2Client } = require('google-auth-library');

// We will skip client verification during development if GOOGLE_CLIENT_ID isn't set
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID || 'placeholder');

// @desc    Register a new customer
// @route   POST /api/auth/register/customer
// @access  Public
const registerCustomer = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: 'customer',
      isVerified: true // Set to true by default for now, can implement email verification later
    });

    if (user) {
      generateTokenAndSetCookie(res, user._id, user.role);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Register a new seller
// @route   POST /api/auth/register/seller
// @access  Public
const registerSeller = async (req, res) => {
  try {
    const { name, email, password, storeName, bankDetails, productCategories } = req.body;

    if (!name || !email || !password || !storeName) {
      return res.status(400).json({ message: 'Name, email, password and store name are required' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: 'seller',
      isVerified: false, // Sellers typically need manual verification by admin
      storeName,
      bankDetails,
      productCategories
    });

    if (user) {
      generateTokenAndSetCookie(res, user._id, user.role);
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      });
    } else {
      res.status(400).json({ message: 'Invalid seller data' });
    }
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      generateTokenAndSetCookie(res, user._id, user.role);

      res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user with Google OAuth
// @route   POST /api/auth/google
// @access  Public
const googleAuth = async (req, res) => {
  try {
    const { credential, roleHint } = req.body; // credential is the ID token from Google

    if (!credential) {
      return res.status(400).json({ message: 'No Google credential provided' });
    }

    let payload;
    
    // In dev mode without real client ID, we might need a workaround, but assuming a valid token:
    try {
      const ticket = await client.verifyIdToken({
        idToken: credential,
        // audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      });
      payload = ticket.getPayload();
    } catch (err) {
      // For testing without a real client ID, we could try to decode the JWT manually (Not recommended for prod)
      // payload = require('jsonwebtoken').decode(credential);
      console.error("Google verify error:", err.message);
      return res.status(401).json({ message: 'Invalid Google Token' });
    }

    const { sub: googleId, email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (user) {
      // Log in existing user
      // If user hasn't linked googleId yet, link it
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    } else {
      // Create new user, default to customer if roleHint isn't seller
      const assignedRole = roleHint === 'seller' ? 'seller' : 'customer';
      
      user = await User.create({
        name,
        email,
        googleId,
        role: assignedRole,
        isVerified: true // Google accounts are implicitly verified
      });
    }

    generateTokenAndSetCookie(res, user._id, user.role);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(500).json({ message: error.message || 'Server error during Google Authentication' });
  }
};

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
const logout = (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'Logged out successfully' });
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      
      if (req.body.addresses) {
        user.addresses = req.body.addresses;
      }

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        addresses: updatedUser.addresses
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update user password
// @route   PUT /api/auth/password
// @access  Private
const updateUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id);

    if (user && (await user.matchPassword(currentPassword))) {
      user.password = newPassword;
      await user.save();
      res.status(200).json({ message: 'Password updated successfully' });
    } else {
      res.status(401).json({ message: 'Invalid current password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerCustomer,
  registerSeller,
  login,
  googleAuth,
  logout,
  getMe,
  updateUserProfile,
  updateUserPassword
};
