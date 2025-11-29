import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Mail, Lock, User, Building, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './AuthPages.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'donor',
    organization: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.organization.trim()) {
      newErrors.organization = 'Organization name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!validateForm()) return;

    setLoading(true);
    try {
      const { confirmPassword, ...userData } = formData;
      await register(userData);
      setMessage({ type: 'success', text: 'Registration successful! Redirecting...' });
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <motion.div
          className="auth-card auth-card-wide"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="auth-header">
            <Link to="/" className="auth-brand">
              <Leaf size={32} />
              <span>GreenBites</span>
            </Link>
            <h1>Create Account</h1>
            <p>Join us in the fight against food waste</p>
          </div>

          {message.text && (
            <motion.div
              className={`alert alert-${message.type}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
              <span>{message.text}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">
                  <User size={16} />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? 'input-error' : ''}`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <span className="form-error">
                    <AlertCircle size={14} />
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Mail size={16} />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'input-error' : ''}`}
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <span className="form-error">
                    <AlertCircle size={14} />
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Lock size={16} />
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-input ${errors.password ? 'input-error' : ''}`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <span className="form-error">
                    <AlertCircle size={14} />
                    {errors.password}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Lock size={16} />
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <span className="form-error">
                    <AlertCircle size={14} />
                    {errors.confirmPassword}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Building size={16} />
                  Organization
                </label>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                  className={`form-input ${errors.organization ? 'input-error' : ''}`}
                  placeholder="Your Organization"
                />
                {errors.organization && (
                  <span className="form-error">
                    <AlertCircle size={14} />
                    {errors.organization}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <User size={16} />
                  Select Your Role
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="form-select role-select"
                >
                  <option value="donor">🍽️ Food Donor - Share surplus food</option>
                  <option value="recipient">🏢 Recipient Organization - Request food donations</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            Already have an account?{' '}
            <Link to="/login" className="auth-link">
              Sign in here
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;
