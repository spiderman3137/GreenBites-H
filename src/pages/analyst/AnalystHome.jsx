import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Package, Activity, Download } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import '../SharedPages.css';
import '../donor/DonorPages.css';

const AnalystHome = () => {
  const { donations = [], requests = [] } = useData();

  const stats = [
    { icon: <Package size={24} />, label: 'Total Donations', value: donations.length, color: 'primary' },
    { icon: <Users size={24} />, label: 'Active Users', value: '127', color: 'success' },
    { icon: <TrendingUp size={24} />, label: 'Growth Rate', value: '+23%', color: 'info' },
    { icon: <Activity size={24} />, label: 'Match Rate', value: '87%', color: 'warning' },
  ];

  const monthlyTrend = [
    { month: 'Jan', donations: 45, requests: 38 },
    { month: 'Feb', donations: 52, requests: 45 },
    { month: 'Mar', donations: 61, requests: 52 },
    { month: 'Apr', donations: 58, requests: 48 },
    { month: 'May', donations: 70, requests: 65 },
    { month: 'Jun', donations: 82, requests: 78 },
  ];

  const categoryData = [
    { name: 'Vegetables', value: 35, color: '#10b981' },
    { name: 'Bakery', value: 25, color: '#8b5cf6' },
    { name: 'Prepared Food', value: 20, color: '#f59e0b' },
    { name: 'Fruits', value: 15, color: '#3b82f6' },
    { name: 'Other', value: 5, color: '#ec4899' },
  ];

  return (
    <div className="analyst-home">
      <div className="page-header">
        <div>
          <h1>Analytics Dashboard</h1>
          <p>Comprehensive insights into food waste reduction</p>
        </div>
        <button className="btn btn-primary">
          <Download size={20} />
          Export Report
        </button>
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

      <div className="charts-grid">
        <motion.div
          className="chart-card large"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3>Donations & Requests Trend</h3>
          <ResponsiveContainer width="100%" height={350}>
            <AreaChart data={monthlyTrend}>
              <defs>
                <linearGradient id="colorDonations" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="donations" stroke="#10b981" fillOpacity={1} fill="url(#colorDonations)" />
              <Area type="monotone" dataKey="requests" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorRequests)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3>Category Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        className="insights-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2>Key Insights</h2>
        <div className="insights-grid">
          <div className="insight-card success">
            <TrendingUp size={32} />
            <h4>23% Increase</h4>
            <p>Donations increased compared to last month, showing growing community engagement</p>
          </div>
          <div className="insight-card warning">
            <Activity size={32} />
            <h4>87% Match Rate</h4>
            <p>Most donations are successfully matched with recipients, indicating efficient distribution</p>
          </div>
          <div className="insight-card info">
            <Package size={32} />
            <h4>Peak Times</h4>
            <p>Highest donation activity occurs between 5-8 PM on weekdays</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalystHome;
