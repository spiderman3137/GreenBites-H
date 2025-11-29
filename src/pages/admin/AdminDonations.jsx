import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Search, Eye } from 'lucide-react';
import '../SharedPages.css';

const AdminDonations = () => {
  const [donations, setDonations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const savedDonations = JSON.parse(localStorage.getItem('greenbites_donations') || '[]');
    setDonations(savedDonations);
  }, []);

  const filteredDonations = donations
    .filter(d => statusFilter === 'all' || d.status === statusFilter)
    .filter(d =>
      d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.donorName.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
    <div className="admin-donations">
      <div className="page-header">
        <div>
          <h1>Donation Management</h1>
          <p>Monitor all donation listings</p>
        </div>
      </div>

      <div className="controls-bar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search donations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          {['all', 'available', 'matched', 'completed'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`filter-btn ${statusFilter === status ? 'active' : ''}`}
            >
              {status === 'all' ? 'All Status' : status}
            </button>
          ))}
        </div>
      </div>

      <div className="users-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Donor</th>
              <th>Category</th>
              <th>Weight</th>
              <th>Expiry</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonations.map((donation, index) => (
              <motion.tr
                key={donation.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <td><strong>{donation.title}</strong></td>
                <td>{donation.donorName}</td>
                <td>{donation.category}</td>
                <td>{donation.weight} {donation.unit}</td>
                <td>{new Date(donation.expiryDate).toLocaleDateString()}</td>
                <td>
                  <span className={`badge badge-${getStatusColor(donation.status)}`}>
                    {donation.status}
                  </span>
                </td>
                <td>
                  <div className="table-actions">
                    <button className="icon-btn-small" title="View">
                      <Eye size={14} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDonations;
