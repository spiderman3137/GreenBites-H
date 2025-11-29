import { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [donations, setDonations] = useState([]);
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Initialize with sample data if needed
  useEffect(() => {
    const savedDonations = localStorage.getItem('greenbites_donations');
    const savedRequests = localStorage.getItem('greenbites_requests');
    
    if (savedDonations) {
      setDonations(JSON.parse(savedDonations));
    }
    if (savedRequests) {
      setRequests(JSON.parse(savedRequests));
    }
  }, []);

  // Donations CRUD
  const createDonation = (donationData) => {
    return new Promise((resolve) => {
      setLoading(true);
      setTimeout(() => {
        const newDonation = {
          id: Date.now().toString(),
          ...donationData,
          status: 'available',
          createdAt: new Date().toISOString(),
          matches: [],
        };
        const updated = [...donations, newDonation];
        setDonations(updated);
        localStorage.setItem('greenbites_donations', JSON.stringify(updated));
        setLoading(false);
        resolve(newDonation);
      }, 500);
    });
  };

  const updateDonation = (id, updates) => {
    return new Promise((resolve) => {
      setLoading(true);
      setTimeout(() => {
        const updated = donations.map(d => 
          d.id === id ? { ...d, ...updates, updatedAt: new Date().toISOString() } : d
        );
        setDonations(updated);
        localStorage.setItem('greenbites_donations', JSON.stringify(updated));
        setLoading(false);
        resolve(updated.find(d => d.id === id));
      }, 500);
    });
  };

  const deleteDonation = (id) => {
    return new Promise((resolve) => {
      setLoading(true);
      setTimeout(() => {
        const updated = donations.filter(d => d.id !== id);
        setDonations(updated);
        localStorage.setItem('greenbites_donations', JSON.stringify(updated));
        setLoading(false);
        resolve();
      }, 500);
    });
  };

  // Requests CRUD
  const createRequest = (requestData) => {
    return new Promise((resolve) => {
      setLoading(true);
      setTimeout(() => {
        const newRequest = {
          id: Date.now().toString(),
          ...requestData,
          status: 'pending',
          createdAt: new Date().toISOString(),
        };
        const updated = [...requests, newRequest];
        setRequests(updated);
        localStorage.setItem('greenbites_requests', JSON.stringify(updated));
        setLoading(false);
        resolve(newRequest);
      }, 500);
    });
  };

  const updateRequest = (id, updates) => {
    return new Promise((resolve) => {
      setLoading(true);
      setTimeout(() => {
        const updated = requests.map(r => 
          r.id === id ? { ...r, ...updates, updatedAt: new Date().toISOString() } : r
        );
        setRequests(updated);
        localStorage.setItem('greenbites_requests', JSON.stringify(updated));
        setLoading(false);
        resolve(updated.find(r => r.id === id));
      }, 500);
    });
  };

  const deleteRequest = (id) => {
    return new Promise((resolve) => {
      setLoading(true);
      setTimeout(() => {
        const updated = requests.filter(r => r.id !== id);
        setRequests(updated);
        localStorage.setItem('greenbites_requests', JSON.stringify(updated));
        setLoading(false);
        resolve();
      }, 500);
    });
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
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
