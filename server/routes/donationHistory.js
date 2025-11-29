import express from 'express';
import DonationHistory from '../models/DonationHistory.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all donation history
router.get('/', authenticate, async (req, res) => {
  try {
    const history = await DonationHistory.find()
      .populate('donorId', 'name email organization')
      .populate('recipientId', 'name email organization')
      .sort({ donatedAt: -1 });
    
    const transformed = history.map(h => ({
      ...h.toObject(),
      id: h._id,
      _id: undefined
    }));
    
    res.json(transformed);
  } catch (error) {
    console.error('Error fetching donation history:', error);
    res.status(500).json({ message: 'Error fetching donation history' });
  }
});

// Get donation history by donor
router.get('/donor/:donorId', authenticate, async (req, res) => {
  try {
    const history = await DonationHistory.find({ donorId: req.params.donorId })
      .populate('recipientId', 'name email organization')
      .sort({ donatedAt: -1 });
    
    const transformed = history.map(h => ({
      ...h.toObject(),
      id: h._id,
      _id: undefined
    }));
    
    res.json(transformed);
  } catch (error) {
    console.error('Error fetching donor history:', error);
    res.status(500).json({ message: 'Error fetching donation history' });
  }
});

// Create donation history entry
router.post('/', authenticate, async (req, res) => {
  try {
    const history = new DonationHistory(req.body);
    await history.save();
    
    const transformed = {
      ...history.toObject(),
      id: history._id,
      _id: undefined
    };
    
    res.status(201).json(transformed);
  } catch (error) {
    console.error('Error creating donation history:', error);
    res.status(500).json({ message: 'Error creating donation history' });
  }
});

export default router;
