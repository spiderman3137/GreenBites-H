import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import DonorHome from './donor/DonorHome';
import DonorDonations from './donor/DonorDonations';
import DonorImpact from './donor/DonorImpact';

const DonorDashboard = () => {
  return (
    <DashboardLayout role="donor">
      <Routes>
        <Route index element={<DonorHome />} />
        <Route path="donations" element={<DonorDonations />} />
        <Route path="impact" element={<DonorImpact />} />
      </Routes>
    </DashboardLayout>
  );
};

export default DonorDashboard;
