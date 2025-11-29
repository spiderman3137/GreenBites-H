// Initialize demo data
export const initializeDemoData = () => {
  // Check if data already exists
  if (localStorage.getItem('greenbites_initialized')) {
    return;
  }

  // Demo users
  const users = [
    {
      id: '1',
      name: 'Admin User',
      email: 'admin@greenbites.com',
      password: 'admin123',
      role: 'admin',
      organization: 'GreenBites',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'John Donor',
      email: 'donor@example.com',
      password: 'donor123',
      role: 'donor',
      organization: 'Fresh Foods Restaurant',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Sarah Recipient',
      email: 'recipient@example.com',
      password: 'recipient123',
      role: 'recipient',
      organization: 'Community Food Bank',
      createdAt: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'Mike Analyst',
      email: 'analyst@example.com',
      password: 'analyst123',
      role: 'analyst',
      organization: 'GreenBites Analytics',
      createdAt: new Date().toISOString(),
    },
  ];

  // Demo donations
  const donations = [
    {
      id: '1',
      donorId: '2',
      donorName: 'Fresh Foods Restaurant',
      title: 'Fresh Vegetables - Mixed',
      description: 'Assorted fresh vegetables from today\'s surplus',
      category: 'Vegetables',
      weight: '25',
      unit: 'kg',
      expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pickupLocation: '123 Main St, Downtown',
      pickupTime: '5:00 PM - 8:00 PM',
      status: 'available',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      matches: [],
    },
    {
      id: '2',
      donorId: '2',
      donorName: 'Fresh Foods Restaurant',
      title: 'Bakery Items - Bread & Pastries',
      description: 'Fresh baked goods from this morning',
      category: 'Bakery',
      weight: '15',
      unit: 'kg',
      expiryDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pickupLocation: '123 Main St, Downtown',
      pickupTime: '6:00 PM - 9:00 PM',
      status: 'completed',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      matches: ['3'],
    },
    {
      id: '3',
      donorId: '2',
      donorName: 'Fresh Foods Restaurant',
      title: 'Prepared Meals - Ready to Serve',
      description: 'Freshly prepared meals, properly packaged',
      category: 'Prepared Food',
      weight: '30',
      unit: 'kg',
      expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pickupLocation: '123 Main St, Downtown',
      pickupTime: '7:00 PM - 10:00 PM',
      status: 'matched',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      matches: ['3'],
    },
  ];

  // Demo requests
  const requests = [
    {
      id: '1',
      recipientId: '3',
      recipientName: 'Community Food Bank',
      title: 'Weekly Food Collection',
      description: 'Looking for any fresh food donations for weekend distribution',
      categories: ['Vegetables', 'Fruits', 'Prepared Food'],
      quantity: '50',
      unit: 'kg',
      urgency: 'medium',
      pickupAvailable: true,
      status: 'pending',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  localStorage.setItem('greenbites_users', JSON.stringify(users));
  localStorage.setItem('greenbites_donations', JSON.stringify(donations));
  localStorage.setItem('greenbites_requests', JSON.stringify(requests));
  localStorage.setItem('greenbites_initialized', 'true');
};
