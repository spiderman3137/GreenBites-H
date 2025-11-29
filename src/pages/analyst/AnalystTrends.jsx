import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import '../SharedPages.css';
import '../donor/DonorPages.css';

const AnalystTrends = () => {
  const growthData = [
    { week: 'Week 1', users: 95, donations: 42, matches: 38 },
    { week: 'Week 2', users: 102, donations: 48, matches: 44 },
    { week: 'Week 3', users: 110, donations: 55, matches: 50 },
    { week: 'Week 4', users: 127, donations: 62, matches: 58 },
  ];

  const performanceData = [
    { metric: 'Response Time', value: 85 },
    { metric: 'Match Quality', value: 92 },
    { metric: 'User Satisfaction', value: 88 },
    { metric: 'Efficiency', value: 90 },
    { metric: 'Coverage', value: 78 },
  ];

  const trends = [
    {
      title: 'User Growth',
      value: '+34%',
      trend: 'up',
      description: 'New user registrations increased significantly',
    },
    {
      title: 'Donation Volume',
      value: '+28%',
      trend: 'up',
      description: 'Food donation listings are trending upward',
    },
    {
      title: 'Response Time',
      value: '-15%',
      trend: 'down',
      description: 'Faster matching between donors and recipients',
    },
  ];

  return (
    <div className="analyst-trends">
      <div className="page-header">
        <div>
          <h1>Trends Analysis</h1>
          <p>Track performance trends and patterns</p>
        </div>
      </div>

      <div className="trends-grid">
        {trends.map((trend, index) => (
          <motion.div
            key={index}
            className="trend-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`trend-icon ${trend.trend}`}>
              {trend.trend === 'up' ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
            </div>
            <div className="trend-content">
              <div className="trend-value">{trend.value}</div>
              <div className="trend-title">{trend.title}</div>
              <p>{trend.description}</p>
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
          <h3>Growth Metrics</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={growthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="users" stroke="#10b981" strokeWidth={3} />
              <Line type="monotone" dataKey="donations" stroke="#8b5cf6" strokeWidth={3} />
              <Line type="monotone" dataKey="matches" stroke="#f59e0b" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3>Performance Radar</h3>
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={performanceData}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis dataKey="metric" />
              <PolarRadiusAxis angle={90} domain={[0, 100]} />
              <Radar name="Performance" dataKey="value" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default AnalystTrends;
