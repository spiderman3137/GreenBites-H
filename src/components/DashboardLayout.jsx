import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  Leaf, LogOut, User, Search, Moon, Sun,
  LayoutDashboard, Package, Users, TrendingUp,
  Settings, Heart, BarChart3
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './DashboardLayout.css';

const DashboardLayout = ({ children, role }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    if (savedMode) {
      document.documentElement.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
    if (newMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = {
    admin: [
      { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/admin' },
      { icon: <Users size={20} />, label: 'Users', path: '/admin/users' },
      { icon: <Package size={20} />, label: 'Donations', path: '/admin/donations' },
      { icon: <TrendingUp size={20} />, label: 'Analytics', path: '/admin/analytics' },
    ],
    donor: [
      { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/donor' },
      { icon: <Package size={20} />, label: 'My Donations', path: '/donor/donations' },
      { icon: <Heart size={20} />, label: 'Impact', path: '/donor/impact' },
    ],
    recipient: [
      { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/recipient' },
      { icon: <Search size={20} />, label: 'Browse Donations', path: '/recipient/browse' },
      { icon: <Package size={20} />, label: 'My Requests', path: '/recipient/requests' },
    ],
    analyst: [
      { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/analyst' },
      { icon: <BarChart3 size={20} />, label: 'Reports', path: '/analyst/reports' },
      { icon: <TrendingUp size={20} />, label: 'Trends', path: '/analyst/trends' },
    ],
  };

  const currentNav = navItems[role] || [];

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-header">
          <Link to="/" className="sidebar-brand">
            <Leaf size={28} />
            <span>GreenBites</span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          {currentNav.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={index}
                to={item.path}
                className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
                {isActive && (
                  <motion.div
                    className="nav-indicator"
                    layoutId="nav-indicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <div className="user-name">{user?.name}</div>
              <div className="user-role">{user?.role}</div>
            </div>
          </div>
          <button onClick={handleLogout} className="btn btn-ghost btn-sm">
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div className="header-search">
            <Search size={20} />
            <input type="text" placeholder="Search..." />
          </div>
          <div className="header-actions">
            <button className="icon-btn" onClick={toggleDarkMode} title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        <div className="dashboard-content">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
