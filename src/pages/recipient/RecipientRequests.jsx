import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, X, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import '../SharedPages.css';
import '../donor/DonorPages.css';

const RecipientRequests = () => {
  const { user } = useAuth();
  const { requests, createRequest, updateRequest, deleteRequest, loading } = useData();
  const [showModal, setShowModal] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categories: [],
    quantity: '',
    unit: 'kg',
    urgency: 'medium',
    pickupAvailable: true,
  });
  
  const [errors, setErrors] = useState({});

  const categories = ['Vegetables', 'Fruits', 'Bakery', 'Dairy', 'Meat', 'Prepared Food', 'Other'];
  const userRequests = requests
    .filter(r => r.recipientId === user.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.categories.length === 0) newErrors.categories = 'Select at least one category';
    if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
      newErrors.quantity = 'Valid quantity is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (editingRequest) {
        await updateRequest(editingRequest.id, formData);
        setMessage({ type: 'success', text: 'Request updated successfully!' });
      } else {
        await createRequest({
          ...formData,
          recipientId: user.id,
          recipientName: user.organization,
        });
        setMessage({ type: 'success', text: 'Request created successfully!' });
      }
      resetForm();
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const handleEdit = (request) => {
    setEditingRequest(request);
    setFormData({
      title: request.title,
      description: request.description,
      categories: request.categories,
      quantity: request.quantity,
      unit: request.unit,
      urgency: request.urgency,
      pickupAvailable: request.pickupAvailable,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this request?')) {
      try {
        await deleteRequest(id);
        setMessage({ type: 'success', text: 'Request deleted successfully!' });
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
      categories: [],
      quantity: '',
      unit: 'kg',
      urgency: 'medium',
      pickupAvailable: true,
    });
    setErrors({});
    setEditingRequest(null);
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const toggleCategory = (cat) => {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat]
    }));
    if (errors.categories) {
      setErrors(prev => ({ ...prev, categories: '' }));
    }
  };

  const getUrgencyColor = (urgency) => {
    const colors = { low: 'info', medium: 'warning', high: 'danger' };
    return colors[urgency] || 'primary';
  };

  const getStatusColor = (status) => {
    const colors = { pending: 'warning', matched: 'success', completed: 'info' };
    return colors[status] || 'primary';
  };

  return (
    <div className="recipient-requests">
      <div className="page-header">
        <div>
          <h1>My Requests</h1>
          <p>Manage your food donation requests</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={20} />
          New Request
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

      {userRequests.length === 0 ? (
        <div className="empty-state">
          <Plus size={64} />
          <h3>No requests yet</h3>
          <p>Create your first request to start receiving donations</p>
          <button onClick={() => setShowModal(true)} className="btn btn-primary">
            <Plus size={20} />
            Create Request
          </button>
        </div>
      ) : (
        <div className="requests-grid">
          {userRequests.map((request) => (
            <motion.div
              key={request.id}
              className="request-card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ y: -4 }}
            >
              <div className="card-header">
                <div className="card-header-content">
                  <h3>{request.title}</h3>
                  <div className="badges">
                    <span className={`badge badge-${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                    <span className={`badge badge-${getUrgencyColor(request.urgency)}`}>
                      {request.urgency} urgency
                    </span>
                  </div>
                </div>
                <div className="card-actions">
                  <button
                    onClick={() => handleEdit(request)}
                    className="icon-btn-small"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(request.id)}
                    className="icon-btn-small danger"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <p className="card-description">{request.description}</p>

              <div className="request-details">
                <div className="detail-item">
                  <strong>Categories:</strong>
                  <div className="category-tags">
                    {request.categories.map(cat => (
                      <span key={cat} className="tag">{cat}</span>
                    ))}
                  </div>
                </div>
                <div className="detail-item">
                  <strong>Quantity:</strong> {request.quantity} {request.unit}
                </div>
                <div className="detail-item">
                  <strong>Pickup:</strong> {request.pickupAvailable ? 'Available' : 'Not Available'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

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
                <h2>{editingRequest ? 'Edit Request' : 'New Request'}</h2>
                <button onClick={resetForm} className="close-btn">
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="modal-form">
                <div className="form-group">
                  <label className="form-label">Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`form-input ${errors.title ? 'input-error' : ''}`}
                    placeholder="e.g., Weekly Food Collection"
                  />
                  {errors.title && <span className="form-error">{errors.title}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={`form-textarea ${errors.description ? 'input-error' : ''}`}
                    placeholder="Describe your needs..."
                    rows="3"
                  ></textarea>
                  {errors.description && <span className="form-error">{errors.description}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Categories * </label>
                  <div className="checkbox-group">
                    {categories.map(cat => (
                      <label key={cat} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.categories.includes(cat)}
                          onChange={() => toggleCategory(cat)}
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                  {errors.categories && <span className="form-error">{errors.categories}</span>}
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Quantity *</label>
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      className={`form-input ${errors.quantity ? 'input-error' : ''}`}
                      placeholder="0"
                      step="0.1"
                    />
                    {errors.quantity && <span className="form-error">{errors.quantity}</span>}
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
                    <label className="form-label">Urgency</label>
                    <select
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="checkbox-label checkbox-main">
                      <input
                        type="checkbox"
                        name="pickupAvailable"
                        checked={formData.pickupAvailable}
                        onChange={handleChange}
                      />
                      <span>Pickup Available</span>
                    </label>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" onClick={resetForm} className="btn btn-ghost">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Saving...' : editingRequest ? 'Update' : 'Create'}
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

export default RecipientRequests;
