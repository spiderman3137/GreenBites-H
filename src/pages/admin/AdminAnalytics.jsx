import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Package } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../SharedPages.css';
import '../donor/DonorPages.css';

const AdminAnalytics = () => {
  const performanceData = [
    { month: 'Jan', donations: 125, users: 85, matches: 110 },
    { month: 'Feb', donations: 145, users: 95, matches: 130 },
    { month: 'Mar', donations: 170, users: 110, matches: 155 },
    { month: 'Apr', donations: 160, users: 105, matches: 145 },
    { month: 'May', donations: 190, users: 120, matches: 175 },
    { month: 'Jun', donations: 220, users: 127, matches: 200 },
  ];

  const stats = [
    { icon: <Users size={24} />, label: 'Total Users', value: '127', change: '+15%', color: 'primary' },
    { icon: <Package size={24} />, label: 'Total Donations', value: '1,010', change: '+23%', color: 'success' },
    { icon: <TrendingUp size={24} />, label: 'Success Rate', value: '91%', change: '+5%', color: 'info' },
    { icon: <BarChart3 size={24} />, label: 'Avg Response Time', value: '2.5h', change: '-12%', color: 'warning' },
  ];

  return (
    <div className="admin-analytics">
      <div className="page-header">
        <div>
          <h1>Platform Analytics</h1>
          <p>Comprehensive platform performance metrics</p>
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
              <div className="stat-change success">
                <TrendingUp size={14} />
                {stat.change}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="chart-card large"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3>Platform Growth</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="donations" stroke="#10b981" strokeWidth={3} />
            <Line type="monotone" dataKey="users" stroke="#8b5cf6" strokeWidth={3} />
            <Line type="monotone" dataKey="matches" stroke="#f59e0b" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

export default AdminAnalytics;
