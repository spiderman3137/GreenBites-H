import { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const DataContext = createContext(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const { user } = useAuth();
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch donations when user changes
  useEffect(() => {
    if (user) {
      fetchDonations();
      fetchRequests();
    }
  }, [user]);

  const fetchDonations = async () => {
    try {
      const data = await api.getDonations();
      setDonations(data);
    } catch (error) {
      console.error('Error fetching donations:', error);
    }
  };

  const fetchRequests = async () => {
    try {
      const data = await api.getRequests();
      setRequests(data);
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  };

  // Donations CRUD
  const createDonation = async (donationData) => {
    try {
      setLoading(true);
      const newDonation = await api.createDonation(donationData);
      setDonations(prev => [...prev, newDonation]);
      return newDonation;
    } catch (error) {
      console.error('Error creating donation:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateDonation = async (id, updates) => {
    try {
      setLoading(true);
      const updated = await api.updateDonation(id, updates);
      setDonations(prev => prev.map(d => d.id === id ? updated : d));
      return updated;
    } catch (error) {
      console.error('Error updating donation:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteDonation = async (id) => {
    try {
      setLoading(true);
      await api.deleteDonation(id);
      setDonations(prev => prev.filter(d => d.id !== id));
    } catch (error) {
      console.error('Error deleting donation:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Requests CRUD
  const createRequest = async (requestData) => {
    try {
      setLoading(true);
      const newRequest = await api.createRequest(requestData);
      setRequests(prev => [...prev, newRequest]);
      return newRequest;
    } catch (error) {
      console.error('Error creating request:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateRequest = async (id, updates) => {
    try {
      setLoading(true);
      const updated = await api.updateRequest(id, updates);
      setRequests(prev => prev.map(r => r.id === id ? updated : r));
      return updated;
    } catch (error) {
      console.error('Error updating request:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteRequest = async (id) => {
    try {
      setLoading(true);
      await api.deleteRequest(id);
      setRequests(prev => prev.filter(r => r.id !== id));
    } catch (error) {
      console.error('Error deleting request:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Analytics
  const getAnalytics = () => {
    const totalDonations = donations.length;
    const totalRequests = requests.length;
    const completedDonations = donations.filter(d => d.status === 'completed').length;
    const totalWeight = donations.reduce((sum, d) => sum + (parseFloat(d.weight) || 0), 0);
    const savedWeight = donations
      .filter(d => d.status === 'completed')
      .reduce((sum, d) => sum + (parseFloat(d.weight) || 0), 0);

    return {
      totalDonations,
      totalRequests,
      completedDonations,
      totalWeight,
      savedWeight,
      impactScore: Math.round(savedWeight * 2.5), // CO2 savings metric
    };
  };

  return (
    <DataContext.Provider
      value={{
        donations,
        requests,
        users,
        loading,
        createDonation,
        updateDonation,
        deleteDonation,
        createRequest,
        updateRequest,
        deleteRequest,
        getAnalytics,
        refreshDonations: fetchDonations,
        refreshRequests: fetchRequests,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
