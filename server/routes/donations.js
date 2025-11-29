import express from 'express';
import Donation from '../models/Donation.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all donations
router.get('/', authenticate, async (req, res) => {
  try {
    const donations = await Donation.find().populate('donorId', 'name email organization');
    const transformedDonations = donations.map(d => ({
      ...d.toObject(),
      id: d._id,
      _id: undefined
    }));
    res.json(transformedDonations);
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ message: 'Error fetching donations' });
  }
});

// Get donations by donor
router.get('/donor/:donorId', authenticate, async (req, res) => {
  try {
    const donations = await Donation.find({ donorId: req.params.donorId });
    const transformedDonations = donations.map(d => ({
      ...d.toObject(),
      id: d._id,
      _id: undefined
    }));
    res.json(transformedDonations);
  } catch (error) {
    console.error('Error fetching donor donations:', error);
    res.status(500).json({ message: 'Error fetching donations' });
  }
});

// Get available donations
router.get('/available', authenticate, async (req, res) => {
  try {
    const donations = await Donation.find({ status: 'available' })
      .populate('donorId', 'name organization');
    const transformedDonations = donations.map(d => ({
      ...d.toObject(),
      id: d._id,
      _id: undefined
    }));
    res.json(transformedDonations);
  } catch (error) {
    console.error('Error fetching available donations:', error);
    res.status(500).json({ message: 'Error fetching donations' });
  }
});

// Create new donation
router.post('/', authenticate, async (req, res) => {
  try {
    const donation = new Donation({
      ...req.body,
      donorId: req.user.userId
    });

    await donation.save();
    const transformed = {
      ...donation.toObject(),
      id: donation._id,
      _id: undefined
    };
    res.status(201).json(transformed);
  } catch (error) {
    console.error('Error creating donation:', error);
    res.status(500).json({ message: 'Error creating donation' });
  }
});

// Update donation
router.put('/:id', authenticate, async (req, res) => {
  try {
    const donation = await Donation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    const transformed = {
      ...donation.toObject(),
      id: donation._id,
      _id: undefined
    };
    res.json(transformed);
  } catch (error) {
    console.error('Error updating donation:', error);
    res.status(500).json({ message: 'Error updating donation' });
  }
});

// Delete donation
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const donation = await Donation.findByIdAndDelete(req.params.id);

    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    res.json({ message: 'Donation deleted successfully' });
  } catch (error) {
    console.error('Error deleting donation:', error);
    res.status(500).json({ message: 'Error deleting donation' });
  }
});

export default router;
