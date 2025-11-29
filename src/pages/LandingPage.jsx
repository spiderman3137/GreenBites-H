import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Leaf, TrendingDown, Users, BarChart3, Heart, Zap, Shield, Globe } from 'lucide-react';
import './LandingPage.css';

const LandingPage = () => {
  const features = [
    {
      icon: <Leaf size={32} />,
      title: 'Food Donors',
      description: 'List surplus food, coordinate donations, and see your environmental impact in real-time',
      color: '#10b981'
    },
    {
      icon: <Users size={32} />,
      title: 'Recipient Organizations',
      description: 'Request donations, manage logistics, and distribute food to those who need it most',
      color: '#8b5cf6'
    },
    {
      icon: <BarChart3 size={32} />,
      title: 'Data Analytics',
      description: 'Track food waste trends, analyze patterns, and generate insights to maximize impact',
      color: '#f59e0b'
    },
    {
      icon: <Shield size={32} />,
      title: 'Platform Management',
      description: 'Admin tools to oversee operations, ensure data accuracy, and maintain quality',
      color: '#3b82f6'
    }
  ];

  const stats = [
    { number: '1.3B', label: 'Tons of food wasted globally/year', icon: <TrendingDown /> },
    { number: '828M', label: 'People facing hunger worldwide', icon: <Heart /> },
    { number: '10%', label: 'Of global greenhouse gas emissions', icon: <Globe /> },
    { number: '$1T', label: 'Economic cost annually', icon: <Zap /> }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Leaf size={24} />
            <span>GreenBites</span>
          </motion.div>
          
          <h1 className="hero-title">
            Transform Food Waste Into
            <span className="gradient-text"> Food Security</span>
          </h1>
          
          <p className="hero-subtitle">
            Join GreenBites in the fight against food waste. Connect donors with recipients, 
            track impact, and create a sustainable food ecosystem for everyone.
          </p>
          
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-large">
              Get Started
              <Zap size={20} />
            </Link>
            <Link to="/login" className="btn btn-outline btn-large">
              Sign In
            </Link>
          </div>
        </motion.div>

        <div className="hero-visual">
          <div className="floating-card card-1">
            <div className="stat-icon success">
              <Leaf size={24} />
            </div>
            <div>
              <div className="stat-value">2.4M kg</div>
              <div className="stat-label">Food Saved</div>
            </div>
          </div>
          <div className="floating-card card-2">
            <div className="stat-icon warning">
              <Users size={24} />
            </div>
            <div>
              <div className="stat-value">15,000+</div>
              <div className="stat-label">People Fed</div>
            </div>
          </div>
          <div className="floating-card card-3">
            <div className="stat-icon primary">
              <TrendingDown size={24} />
            </div>
            <div>
              <div className="stat-value">-68%</div>
              <div className="stat-label">Waste Reduced</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>The Food Waste Crisis</h2>
            <p>Understanding the global impact of food waste</p>
          </motion.div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="stat-icon-large">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-description">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Built For Everyone</h2>
            <p>Comprehensive tools for all stakeholders in the food recovery ecosystem</p>
          </motion.div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <div className="feature-icon" style={{ color: feature.color }}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Make an Impact?</h2>
          <p>Join thousands of organizations reducing food waste and fighting hunger</p>
          <Link to="/register" className="btn btn-primary btn-large">
            Start Your Journey
            <Leaf size={20} />
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <div className="brand-logo">
                <Leaf size={28} />
                <span>GreenBites</span>
              </div>
              <p>Transforming food waste into food security</p>
            </div>
            <div className="footer-links">
              <div>
                <h4>Platform</h4>
                <Link to="/login">Sign In</Link>
                <Link to="/register">Register</Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 GreenBites. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
