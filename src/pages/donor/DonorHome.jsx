import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, TrendingUp, Heart, Clock, Plus, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { api } from '../../services/api';
import { Link } from 'react-router-dom';
import './DonorPages.css';

const DonorHome = () => {
  const { user } = useAuth();
  const { donations, getAnalytics } = useData();
  const [donationHistory, setDonationHistory] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    completed: 0,
    totalWeight: 0,
  });

  useEffect(() => {
    const userDonations = donations.filter(d => d.donorId === user.id);
    setStats({
      total: userDonations.length,
      active: userDonations.filter(d => d.status === 'available' || d.status === 'matched').length,
      completed: userDonations.filter(d => d.status === 'completed').length,
      totalWeight: userDonations.reduce((sum, d) => sum + parseFloat(d.weight || 0), 0),
    });
  }, [donations, user.id]);

  useEffect(() => {
    // Fetch donation history
    const fetchHistory = async () => {
      try {
        const history = await api.getDonationHistoryByDonor(user.id);
        setDonationHistory(history);
      } catch (error) {
        console.error('Error fetching donation history:', error);
      }
    };
    fetchHistory();
  }, [user.id]);

  const statCards = [
    {
      icon: <Package size={24} />,
      label: 'Total Donations',
      value: stats.total,
      color: 'primary',
    },
    {
      icon: <Clock size={24} />,
      label: 'Active Listings',
      value: stats.active,
      color: 'warning',
    },
    {
      icon: <Heart size={24} />,
      label: 'Completed',
      value: stats.completed,
      color: 'success',
    },
    {
      icon: <TrendingUp size={24} />,
      label: 'Total Weight (kg)',
      value: stats.totalWeight.toFixed(1),
      color: 'info',
    },
  ];

  const recentDonations = donations
    .filter(d => d.donorId === user.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

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
    <div className="donor-home">
      <div className="page-header">
        <div>
          <h1>Welcome back, {user?.name}!</h1>
          <p>Track your donations and see your impact</p>
        </div>
        <Link to="/donor/donations" className="btn btn-primary">
          <Plus size={20} />
          New Donation
        </Link>
      </div>

      <div className="stats-grid">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            className="stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`stat-icon-wrapper ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="section">
        <div className="section-header">
          <h2>Recent Donations</h2>
          <Link to="/donor/donations" className="view-all-link">
            View All
          </Link>
        </div>

        {recentDonations.length === 0 ? (
          <div className="empty-state">
            <Package size={48} />
            <h3>No donations yet</h3>
            <p>Create your first donation to get started</p>
            <Link to="/donor/donations" className="btn btn-primary">
              <Plus size={20} />
              Create Donation
            </Link>
          </div>
        ) : (
          <div className="donations-list">
            {recentDonations.map((donation) => (
              <motion.div
                key={donation.id}
                className="donation-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ y: -4 }}
              >
                <div className="donation-header">
                  <div>
                    <h3>{donation.title}</h3>
                    <p className="donation-category">{donation.category}</p>
                  </div>
                  <span className={`badge badge-${getStatusColor(donation.status)}`}>
                    {donation.status}
                  </span>
                </div>
                <p className="donation-description">{donation.description}</p>
                <div className="donation-meta">
                  <span className="meta-item">
                    <Package size={16} />
                    {donation.weight} {donation.unit}
                  </span>
                  <span className="meta-item">
                    <Clock size={16} />
                    Expires: {new Date(donation.expiryDate).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Donation History Section */}
      <div className="recent-section">
        <div className="section-header">
          <h2>Donation History</h2>
          <span className="badge badge-info">{donationHistory.length} donated</span>
        </div>

        {donationHistory.length === 0 ? (
          <div className="empty-state">
            <CheckCircle size={48} />
            <h3>No donation history yet</h3>
            <p>Your completed donations will appear here</p>
          </div>
        ) : (
          <div className="donations-list">
            {donationHistory.slice(0, 5).map((history) => (
              <motion.div
                key={history.id}
                className="donation-card"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ y: -4 }}
              >
                <div className="donation-header">
                  <div>
                    <h3>{history.title}</h3>
                    <p className="donation-category">{history.category}</p>
                  </div>
                  <span className="badge badge-success">
                    <CheckCircle size={14} /> Donated
                  </span>
                </div>
                <p className="donation-description">{history.description}</p>
                <div className="donation-meta">
                  <span className="meta-item">
                    <Package size={16} />
                    {history.weight} {history.unit}
                  </span>
                  <span className="meta-item">
                    <Heart size={16} />
                    Received by: {history.recipientName}
                  </span>
                  <span className="meta-item">
                    <Clock size={16} />
                    {new Date(history.donatedAt).toLocaleDateString()}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonorHome;
