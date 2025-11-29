import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import RecipientHome from './recipient/RecipientHome';
import RecipientBrowse from './recipient/RecipientBrowse';
import RecipientRequests from './recipient/RecipientRequests';

const RecipientDashboard = () => {
  return (
    <DashboardLayout role="recipient">
      <Routes>
        <Route index element={<RecipientHome />} />
        <Route path="browse" element={<RecipientBrowse />} />
        <Route path="requests" element={<RecipientRequests />} />
      </Routes>
    </DashboardLayout>
  );
};

export default RecipientDashboard;
