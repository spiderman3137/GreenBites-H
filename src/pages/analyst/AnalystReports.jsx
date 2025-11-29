import { motion } from 'framer-motion';
import { FileText, Download, Calendar, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../SharedPages.css';
import '../donor/DonorPages.css';

const AnalystReports = () => {
  const impactData = [
    { metric: 'Food Saved (kg)', value: 1250, target: 1500 },
    { metric: 'CO₂ Reduced (kg)', value: 3125, target: 3500 },
    { metric: 'People Fed', value: 3750, target: 4000 },
    { metric: 'Donors Active', value: 45, target: 50 },
  ];

  const reports = [
    {
      title: 'Monthly Impact Report',
      date: 'June 2024',
      type: 'Impact Analysis',
      status: 'completed',
    },
    {
      title: 'Quarterly Trends Analysis',
      date: 'Q2 2024',
      type: 'Trend Report',
      status: 'completed',
    },
    {
      title: 'Donor Engagement Report',
      date: 'June 2024',
      type: 'Engagement',
      status: 'in-progress',
    },
  ];

  return (
    <div className="analyst-reports">
      <div className="page-header">
        <div>
          <h1>Reports</h1>
          <p>Generate and view detailed analytics reports</p>
        </div>
        <button className="btn btn-primary">
          <FileText size={20} />
          Generate Report
        </button>
      </div>

      <motion.div
        className="chart-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3>Performance vs Targets</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={impactData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="metric" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#10b981" name="Current" />
            <Bar dataKey="target" fill="#e5e7eb" name="Target" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <div className="section">
        <h2>Recent Reports</h2>
        <div className="reports-list">
          {reports.map((report, index) => (
            <motion.div
              key={index}
              className="report-card"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="report-icon">
                <FileText size={32} />
              </div>
              <div className="report-content">
                <h4>{report.title}</h4>
                <div className="report-meta">
                  <span className="meta-item">
                    <Calendar size={14} />
                    {report.date}
                  </span>
                  <span className={`badge badge-${report.status === 'completed' ? 'success' : 'warning'}`}>
                    {report.status}
                  </span>
                </div>
              </div>
              <button className="btn btn-ghost">
                <Download size={18} />
                Download
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalystReports;
