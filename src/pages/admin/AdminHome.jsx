import { motion } from 'framer-motion';
import { Users, Package, Activity, Shield, TrendingUp, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../SharedPages.css';
import '../donor/DonorPages.css';

const AdminHome = () => {
  const stats = [
    { icon: <Users size={24} />, label: 'Total Users', value: '127', color: 'primary' },
    { icon: <Package size={24} />, label: 'Active Donations', value: '48', color: 'success' },
    { icon: <Activity size={24} />, label: 'Pending Requests', value: '12', color: 'warning' },
    { icon: <Shield size={24} />, label: 'Platform Health', value: '98%', color: 'info' },
  ];

  const activityData = [
    { day: 'Mon', users: 85, donations: 42 },
    { day: 'Tue', users: 92, donations: 48 },
    { day: 'Wed', users: 88, donations: 45 },
    { day: 'Thu', users: 95, donations: 52 },
    { day: 'Fri', users: 102, donations: 58 },
    { day: 'Sat', users: 78, donations: 35 },
    { day: 'Sun', users: 70, donations: 30 },
  ];

  const recentActivity = [
    { user: 'John Donor', action: 'Created donation', item: 'Fresh Vegetables', time: '5 min ago' },
    { user: 'Sarah Recipient', action: 'Requested donation', item: 'Bakery Items', time: '12 min ago' },
    { user: 'Mike Analyst', action: 'Generated report', item: 'Monthly Impact', time: '25 min ago' },
  ];

  return (
    <div className="admin-home">
      <div className="page-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Monitor and manage platform operations</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
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

      <div className="admin-grid">
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3>Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Bar dataKey="users" fill="#10b981" />
              <Bar dataKey="donations" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="activity-feed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {recentActivity.map((activity, index) => (
              <div key={index} className="activity-item">
                <div className="activity-icon">
                  <Activity size={16} />
                </div>
                <div className="activity-content">
                  <p>
                    <strong>{activity.user}</strong> {activity.action}
                  </p>
                  <p className="activity-detail">{activity.item}</p>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className="alerts-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3>System Alerts</h3>
        <div className="alert alert-warning">
          <AlertCircle size={20} />
          <span>12 donation requests are pending review</span>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminHome;
