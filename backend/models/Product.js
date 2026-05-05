const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [2000, 'Description cannot be more than 2000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price must be positive']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: [
      'Tech & Gadgets',
      'Modern Fashion',
      'Home Interior',
      'Beauty & Care',
      'Outdoor Gear',
      'Art & Jewelry'
    ]
  },
  images: [
    {
      type: String,
      required: true
    }
  ],
  stock: {
    type: Number,
    required: [true, 'Please add stock amount'],
    default: 0
  },
  averageRating: {
    type: Number,
    default: 0,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot be more than 5']
  },
  numOfReviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexing for search
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
