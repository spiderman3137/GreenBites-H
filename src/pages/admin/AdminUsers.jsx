import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Edit, Trash2, Shield } from 'lucide-react';
import '../SharedPages.css';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem('greenbites_users') || '[]');
    setUsers(savedUsers);
  }, []);

  const filteredUsers = users
    .filter(u => roleFilter === 'all' || u.role === roleFilter)
    .filter(u =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const getRoleColor = (role) => {
    const colors = {
      admin: 'danger',
      donor: 'success',
      recipient: 'info',
      analyst: 'warning',
    };
    return colors[role] || 'primary';
  };

  return (
    <div className="admin-users">
      <div className="page-header">
        <div>
          <h1>User Management</h1>
          <p>Manage platform users and permissions</p>
        </div>
      </div>

      <div className="controls-bar">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-buttons">
          {['all', 'admin', 'donor', 'recipient', 'analyst'].map(role => (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`filter-btn ${roleFilter === role ? 'active' : ''}`}
            >
              {role === 'all' ? 'All Roles' : role}
            </button>
          ))}
        </div>
      </div>

      <div className="users-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Organization</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <td>
                  <div className="user-cell">
                    <div className="user-avatar-small">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <strong>{user.name}</strong>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.organization}</td>
                <td>
                  <span className={`badge badge-${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="table-actions">
                    <button className="icon-btn-small" title="Edit">
                      <Edit size={14} />
                    </button>
                    <button className="icon-btn-small danger" title="Delete">
                      <Trash2 size={14} />
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

export default AdminUsers;
