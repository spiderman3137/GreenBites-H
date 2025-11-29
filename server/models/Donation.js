import mongoose from 'mongoose';

const donationSchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  donorName: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Vegetables', 'Fruits', 'Dairy', 'Bakery', 'Prepared Food', 'Canned Goods', 'Other']
  },
  weight: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    default: 'kg'
  },
  expiryDate: {
    type: Date,
    required: true
  },
  pickupLocation: {
    type: String,
    required: true
  },
  pickupTime: {
    type: String
  },
  status: {
    type: String,
    enum: ['available', 'pending', 'completed', 'cancelled'],
    default: 'available'
  },
  matches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Donation', donationSchema);
