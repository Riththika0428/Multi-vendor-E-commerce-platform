const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    commissionPercentage: {
      type: Number,
      required: true,
      default: 10,
    },
    platformName: {
      type: String,
      default: 'Multi-Vendor Marketplace',
    },
    contactEmail: {
      type: String,
    },
    // Any other global configs
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model('Settings', settingsSchema);

module.exports = Settings;
