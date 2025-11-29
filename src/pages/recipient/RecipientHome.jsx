import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, Clock, Heart, TrendingUp } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { Link } from 'react-router-dom';
import '../donor/DonorPages.css';

const RecipientHome = () => {
  const { user } = useAuth();
  const { donations, requests } = useData();
  const [stats, setStats] = useState({
    available: 0,
    myRequests: 0,
    matched: 0,
    totalReceived: 0,
  });

  useEffect(() => {
    const availableDonations = donations.filter(d => d.status === 'available').length;
    const myRequests = requests.filter(r => r.recipientId === user.id).length;
    const matched = requests.filter(r => r.recipientId === user.id && r.status === 'matched').length;
    
    setStats({
      available: availableDonations,
      myRequests,
      matched,
      totalReceived: 12, // Mock data
    });
  }, [donations, requests, user.id]);

  const statCards = [
    {
      icon: <Search size={24} />,
      label: 'Available Donations',
      value: stats.available,
      color: 'success',
    },
    {
      icon: <Package size={24} />,
      label: 'My Requests',
      value: stats.myRequests,
      color: 'warning',
    },
    {
      icon: <Clock size={24} />,
      label: 'Matched',
      value: stats.matched,
      color: 'info',
    },
    {
      icon: <Heart size={24} />,
      label: 'Total Received',
      value: stats.totalReceived,
      color: 'primary',
    },
  ];

  const recentDonations = donations
    .filter(d => d.status === 'available')
    .slice(0, 3);

  return (
    <div className="recipient-home">
      <div className="page-header">
        <div>
          <h1>Welcome, {user?.name}!</h1>
          <p>Browse available donations and manage your requests</p>
        </div>
        <Link to="/recipient/browse" className="btn btn-primary">
          <Search size={20} />
          Browse Donations
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
          <h2>Recently Available</h2>
          <Link to="/recipient/browse" className="view-all-link">
            View All
          </Link>
        </div>

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
                  <p className="donation-category">{donation.donorName}</p>
                </div>
                <span className="badge badge-success">Available</span>
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
      </div>
    </div>
  );
};

export default RecipientHome;
