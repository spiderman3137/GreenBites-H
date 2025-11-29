import express from 'express';
import Request from '../models/Request.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Get all requests
router.get('/', authenticate, async (req, res) => {
  try {
    const requests = await Request.find().populate('recipientId', 'name email organization');
    const transformedRequests = requests.map(r => ({
      ...r.toObject(),
      id: r._id,
      _id: undefined
    }));
    res.json(transformedRequests);
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ message: 'Error fetching requests' });
  }
});

// Get requests by recipient
router.get('/recipient/:recipientId', authenticate, async (req, res) => {
  try {
    const requests = await Request.find({ recipientId: req.params.recipientId });
    const transformedRequests = requests.map(r => ({
      ...r.toObject(),
      id: r._id,
      _id: undefined
    }));
    res.json(transformedRequests);
  } catch (error) {
    console.error('Error fetching recipient requests:', error);
    res.status(500).json({ message: 'Error fetching requests' });
  }
});

// Create new request
router.post('/', authenticate, async (req, res) => {
  try {
    const request = new Request({
      ...req.body,
      recipientId: req.user.userId
    });

    await request.save();
    const transformed = {
      ...request.toObject(),
      id: request._id,
      _id: undefined
    };
    res.status(201).json(transformed);
  } catch (error) {
    console.error('Error creating request:', error);
    res.status(500).json({ message: 'Error creating request' });
  }
});

// Update request
router.put('/:id', authenticate, async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    const transformed = {
      ...request.toObject(),
      id: request._id,
      _id: undefined
    };
    res.json(transformed);
  } catch (error) {
    console.error('Error updating request:', error);
    res.status(500).json({ message: 'Error updating request' });
  }
});

// Delete request
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const request = await Request.findByIdAndDelete(req.params.id);

    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    console.error('Error deleting request:', error);
    res.status(500).json({ message: 'Error deleting request' });
  }
});

export default router;
