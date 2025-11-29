import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, MapPin, Clock, Calendar, Filter, Heart } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import '../SharedPages.css';
import '../donor/DonorPages.css';

const RecipientBrowse = () => {
  const { user } = useAuth();
  const { donations, deleteDonation, createRequest, loading } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [message, setMessage] = useState({ type: '', text: '' });

  const availableDonations = donations
    .filter(d => d.status === 'available')
    .filter(d => categoryFilter === 'all' || d.category === categoryFilter)
    .filter(d =>
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const categories = ['all', 'Vegetables', 'Fruits', 'Bakery', 'Dairy', 'Meat', 'Prepared Food', 'Other'];

  const handleRequest = async (donation) => {
    try {
      console.log('Requesting donation:', donation);
      
      // Create donation history entry
      const historyData = {
        donorId: donation.donorId,
        donorName: donation.donorName,
        recipientId: user.id,
        recipientName: user.organization || user.name,
        title: donation.title,
        description: donation.description,
        category: donation.category,
        weight: parseFloat(donation.weight) || 0,
        unit: donation.unit,
        pickupLocation: donation.pickupLocation,
        status: 'donated'
      };
      
      console.log('Creating donation history:', historyData);
      await api.createDonationHistory(historyData);
      
      // Create a request from the donation
      const requestData = {
        recipientId: user.id,
        recipientName: user.organization || user.name,
        title: donation.title,
        description: donation.description,
        categories: [donation.category],
        quantity: parseFloat(donation.weight) || 0,
        unit: donation.unit,
        urgency: 'medium',
        pickupAvailable: true,
        deliveryAddress: donation.pickupLocation,
        status: 'completed'
      };

      console.log('Creating request with data:', requestData);
      await createRequest(requestData);

      // Delete the donation from donations collection
      console.log('Deleting donation:', donation.id);
      await deleteDonation(donation.id);

      setMessage({ type: 'success', text: 'Request sent successfully! Donation has been claimed.' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Request error:', error);
      console.error('Error response:', error.response?.data);
      const errorMsg = error.response?.data?.message || 'Failed to send request. Please try again.';
      setMessage({ type: 'error', text: errorMsg });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    }
  };

  return (
    <div className="recipient-browse">
      <div className="page-header">
        <div>
          <h1>Browse Donations</h1>
          <p>Find available food donations in your area</p>
        </div>
      </div>

      {message.text && (
        <motion.div
          className={`alert alert-${message.type}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {message.type === 'success' ? <Heart size={20} /> : <Package size={20} />}
          <span>{message.text}</span>
        </motion.div>
      )}

      <div className="browse-controls">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search donations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`filter-chip ${categoryFilter === cat ? 'active' : ''}`}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
      </div>

      <div className="browse-grid">
        {availableDonations.length === 0 ? (
          <div className="empty-state">
            <Package size={64} />
            <h3>No donations available</h3>
            <p>Check back later for new donations</p>
          </div>
        ) : (
          availableDonations.map((donation) => (
            <motion.div
              key={donation.id}
              className="browse-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -6 }}
            >
              <div className="browse-card-header">
                <div className="category-badge">{donation.category}</div>
                <span className="badge badge-success">Available</span>
              </div>

              <h3>{donation.title}</h3>
              <p className="donor-name">{donation.donorName}</p>
              <p className="description">{donation.description}</p>

              <div className="browse-meta">
                <div className="meta-row">
                  <Package size={16} />
                  <span>{donation.weight} {donation.unit}</span>
                </div>
                <div className="meta-row">
                  <Calendar size={16} />
                  <span>Exp: {new Date(donation.expiryDate).toLocaleDateString()}</span>
                </div>
                <div className="meta-row">
                  <Clock size={16} />
                  <span>{donation.pickupTime}</span>
                </div>
                <div className="meta-row full">
                  <MapPin size={16} />
                  <span>{donation.pickupLocation}</span>
                </div>
              </div>

              <button
                onClick={() => handleRequest(donation)}
                className="btn btn-primary btn-full"
                disabled={loading}
              >
                <Heart size={18} />
                Request Donation
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecipientBrowse;
