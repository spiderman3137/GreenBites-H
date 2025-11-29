import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Edit, Trash2, Package, Clock, MapPin,
  X, AlertCircle, CheckCircle, Calendar, Weight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import './DonorPages.css';

const DonorDonations = () => {
  const { user } = useAuth();
  const { donations, createDonation, updateDonation, deleteDonation, loading } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingDonation, setEditingDonation] = useState(null);
  const [filter, setFilter] = useState('all');
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Vegetables',
    weight: '',
    unit: 'kg',
    expiryDate: '',
    pickupLocation: '',
    pickupTime: '',
  });
  
  const [errors, setErrors] = useState({});

  const categories = [
    'Vegetables', 'Fruits', 'Bakery', 'Dairy', 'Meat',
    'Prepared Food', 'Canned Goods', 'Grains', 'Other'
  ];

  const userDonations = donations
    .filter(d => d.donorId === user.id)
    .filter(d => filter === 'all' || d.status === filter)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.weight || parseFloat(formData.weight) <= 0) {
      newErrors.weight = 'Valid weight is required';
    }
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (new Date(formData.expiryDate) < new Date()) {
      newErrors.expiryDate = 'Expiry date must be in the future';
    }
    if (!formData.pickupLocation.trim()) newErrors.pickupLocation = 'Pickup location is required';
    if (!formData.pickupTime.trim()) newErrors.pickupTime = 'Pickup time is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editingDonation) {
        await updateDonation(editingDonation.id, formData);
        setMessage({ type: 'success', text: 'Donation updated successfully!' });
      } else {
        await createDonation({
          ...formData,
          donorId: user.id,
          donorName: user.organization,
        });
        setMessage({ type: 'success', text: 'Donation created successfully!' });
      }
      resetForm();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const handleEdit = (donation) => {
    setEditingDonation(donation);
    setFormData({
      title: donation.title,
      description: donation.description,
      category: donation.category,
      weight: donation.weight,
      unit: donation.unit,
      expiryDate: donation.expiryDate,
      pickupLocation: donation.pickupLocation,
      pickupTime: donation.pickupTime,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this donation?')) {
      try {
        await deleteDonation(id);
        setMessage({ type: 'success', text: 'Donation deleted successfully!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } catch (error) {
        setMessage({ type: 'error', text: error.message });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Vegetables',
      weight: '',
      unit: 'kg',
      expiryDate: '',
      pickupLocation: '',
      pickupTime: '',
    });
    setErrors({});
    setEditingDonation(null);
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      available: 'success',
      matched: 'warning',
      completed: 'info',
      expired: 'danger',
    };
    return colors[status] || 'primary';
  };

  return (
    <div className="donor-donations">
      <div className="page-header">
        <div>
          <h1>My Donations</h1>
          <p>Manage your food donations</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={20} />
          New Donation
        </button>
      </div>

      {message.text && (
        <motion.div
          className={`alert alert-${message.type}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span>{message.text}</span>
        </motion.div>
      )}

      <div className="filter-bar">
        <button
          onClick={() => setFilter('all')}
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('available')}
          className={`filter-btn ${filter === 'available' ? 'active' : ''}`}
        >
          Available
        </button>
        <button
          onClick={() => setFilter('matched')}
          className={`filter-btn ${filter === 'matched' ? 'active' : ''}`}
        >
          Matched
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
        >
          Completed
        </button>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="loader"></div>
        </div>
      ) : userDonations.length === 0 ? (
        <div className="empty-state">
          <Package size={64} />
          <h3>No donations found</h3>
          <p>Create your first donation to get started</p>
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            <Plus size={20} />
            Create Donation
          </button>
        </div>
      ) : (
        <div className="donations-grid">
          {userDonations.map((donation) => (
            <motion.div
              key={donation.id}
              className="donation-item-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -6 }}
            >
              <div className="card-header">
                <div className="card-header-content">
                  <h3>{donation.title}</h3>
                  <span className={`badge badge-${getStatusColor(donation.status)}`}>
                    {donation.status}
                  </span>
                </div>
                <div className="card-actions">
                  <button
                    onClick={() => handleEdit(donation)}
                    className="icon-btn-small"
                    title="Edit"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(donation.id)}
                    className="icon-btn-small danger"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <p className="card-description">{donation.description}</p>

              <div className="card-meta-grid">
                <div className="meta-item">
                  <Package size={16} />
                  <span>{donation.category}</span>
                </div>
                <div className="meta-item">
                  <Weight size={16} />
                  <span>{donation.weight} {donation.unit}</span>
                </div>
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>Exp: {new Date(donation.expiryDate).toLocaleDateString()}</span>
                </div>
                <div className="meta-item">
                  <Clock size={16} />
                  <span>{donation.pickupTime}</span>
                </div>
                <div className="meta-item full-width">
                  <MapPin size={16} />
                  <span>{donation.pickupLocation}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetForm}
          >
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h2>{editingDonation ? 'Edit Donation' : 'New Donation'}</h2>
                <button onClick={resetForm} className="close-btn">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className={`form-input ${errors.title ? 'input-error' : ''}`}
                      placeholder="e.g., Fresh Vegetables"
                    />
                    {errors.title && <span className="form-error">{errors.title}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Category *</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="form-select"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className={`form-textarea ${errors.description ? 'input-error' : ''}`}
                      placeholder="Describe the food items..."
                      rows="3"
                    ></textarea>
                    {errors.description && <span className="form-error">{errors.description}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Weight *</label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      className={`form-input ${errors.weight ? 'input-error' : ''}`}
                      placeholder="0"
                      step="0.1"
                    />
                    {errors.weight && <span className="form-error">{errors.weight}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Unit</label>
                    <select
                      name="unit"
                      value={formData.unit}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="kg">Kilograms</option>
                      <option value="lbs">Pounds</option>
                      <option value="items">Items</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Expiry Date *</label>
                    <input
                      type="date"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      className={`form-input ${errors.expiryDate ? 'input-error' : ''}`}
                    />
                    {errors.expiryDate && <span className="form-error">{errors.expiryDate}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Pickup Time *</label>
                    <input
                      type="text"
                      name="pickupTime"
                      value={formData.pickupTime}
                      onChange={handleChange}
                      className={`form-input ${errors.pickupTime ? 'input-error' : ''}`}
                      placeholder="e.g., 5:00 PM - 8:00 PM"
                    />
                    {errors.pickupTime && <span className="form-error">{errors.pickupTime}</span>}
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">Pickup Location *</label>
                    <input
                      type="text"
                      name="pickupLocation"
                      value={formData.pickupLocation}
                      onChange={handleChange}
                      className={`form-input ${errors.pickupLocation ? 'input-error' : ''}`}
                      placeholder="Full address"
                    />
                    {errors.pickupLocation && <span className="form-error">{errors.pickupLocation}</span>}
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" onClick={resetForm} className="btn btn-ghost">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : editingDonation ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DonorDonations;
