import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import AdminHome from './admin/AdminHome';
import AdminUsers from './admin/AdminUsers';
import AdminDonations from './admin/AdminDonations';
import AdminAnalytics from './admin/AdminAnalytics';

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin">
      <Routes>
        <Route index element={<AdminHome />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="donations" element={<AdminDonations />} />
        <Route path="analytics" element={<AdminAnalytics />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AdminDashboard;
