import mongoose from 'mongoose';

const donationHistorySchema = new mongoose.Schema({
  donorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  donorName: {
    type: String,
    required: true
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  recipientName: {
    type: String
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
    required: true
  },
  weight: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    default: 'kg'
  },
  pickupLocation: {
    type: String,
    required: true
  },
  donatedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['donated', 'completed'],
    default: 'donated'
  }
});

export default mongoose.model('DonationHistory', donationHistorySchema);
