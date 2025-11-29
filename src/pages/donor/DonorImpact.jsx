import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Heart, Leaf, Users, Award, Calendar } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useData } from '../../contexts/DataContext';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './DonorPages.css';

const DonorImpact = () => {
  const { user } = useAuth();
  const { donations } = useData();
  const [impactData, setImpactData] = useState({
    totalWeight: 0,
    co2Saved: 0,
    peopleFed: 0,
    completedDonations: 0,
  });

  useEffect(() => {
    const userDonations = donations.filter(d => d.donorId === user.id);
    const completedDonations = userDonations.filter(d => d.status === 'completed');
    const totalWeight = completedDonations.reduce((sum, d) => sum + parseFloat(d.weight || 0), 0);

    setImpactData({
      totalWeight: totalWeight.toFixed(1),
      co2Saved: (totalWeight * 2.5).toFixed(1), // Approximate CO2 savings
      peopleFed: Math.floor(totalWeight * 3), // Approximate people fed
      completedDonations: completedDonations.length,
    });
  }, [donations, user.id]);

  const monthlyData = [
    { month: 'Jan', weight: 45 },
    { month: 'Feb', weight: 52 },
    { month: 'Mar', weight: 61 },
    { month: 'Apr', weight: 58 },
    { month: 'May', weight: 70 },
    { month: 'Jun', weight: 65 },
  ];

  const categoryData = [
    { name: 'Vegetables', value: 35 },
    { name: 'Bakery', value: 25 },
    { name: 'Prepared Food', value: 20 },
    { name: 'Fruits', value: 15 },
    { name: 'Other', value: 5 },
  ];

  const COLORS = ['#10b981', '#8b5cf6', '#f59e0b', '#3b82f6', '#ec4899'];

  const impactCards = [
    {
      icon: <Leaf size={32} />,
      label: 'Total Food Saved',
      value: `${impactData.totalWeight} kg`,
      color: 'success',
      trend: '+12%',
    },
    {
      icon: <TrendingUp size={32} />,
      label: 'CO₂ Emissions Saved',
      value: `${impactData.co2Saved} kg`,
      color: 'primary',
      trend: '+8%',
    },
    {
      icon: <Users size={32} />,
      label: 'People Fed',
      value: impactData.peopleFed,
      color: 'warning',
      trend: '+15%',
    },
    {
      icon: <Award size={32} />,
      label: 'Completed Donations',
      value: impactData.completedDonations,
      color: 'info',
      trend: '+20%',
    },
  ];

  return (
    <div className="donor-impact">
      <div className="page-header">
        <div>
          <h1>Your Impact</h1>
          <p>See the difference you're making</p>
        </div>
      </div>

      <div className="impact-cards-grid">
        {impactCards.map((card, index) => (
          <motion.div
            key={index}
            className="impact-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`impact-icon ${card.color}`}>
              {card.icon}
            </div>
            <div className="impact-content">
              <div className="impact-value">{card.value}</div>
              <div className="impact-label">{card.label}</div>
              <div className="impact-trend success">
                <TrendingUp size={14} />
                {card.trend} from last month
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="charts-grid">
        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3>Monthly Food Saved (kg)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="chart-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3>Donations by Category</h3>
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
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        className="milestones-section"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2>Achievements</h2>
        <div className="milestones-grid">
          <div className="milestone-card achieved">
            <div className="milestone-icon">
              <Award size={32} />
            </div>
            <h4>First Donation</h4>
            <p>Completed your first donation</p>
          </div>
          <div className="milestone-card achieved">
            <div className="milestone-icon">
              <Leaf size={32} />
            </div>
            <h4>50kg Milestone</h4>
            <p>Donated 50kg of food</p>
          </div>
          <div className="milestone-card">
            <div className="milestone-icon">
              <Heart size={32} />
            </div>
            <h4>100 People Fed</h4>
            <p>Help feed 100 people</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '60%' }}></div>
            </div>
          </div>
          <div className="milestone-card">
            <div className="milestone-icon">
              <Calendar size={32} />
            </div>
            <h4>6 Month Streak</h4>
            <p>Donate for 6 consecutive months</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '33%' }}></div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DonorImpact;
