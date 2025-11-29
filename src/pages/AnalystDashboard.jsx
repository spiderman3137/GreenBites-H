import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import AnalystHome from './analyst/AnalystHome';
import AnalystReports from './analyst/AnalystReports';
import AnalystTrends from './analyst/AnalystTrends';

const AnalystDashboard = () => {
  return (
    <DashboardLayout role="analyst">
      <Routes>
        <Route index element={<AnalystHome />} />
        <Route path="reports" element={<AnalystReports />} />
        <Route path="trends" element={<AnalystTrends />} />
      </Routes>
    </DashboardLayout>
  );
};

export default AnalystDashboard;
