# GreenBites - Food Waste Reduction Platform

A comprehensive platform to track and reduce food waste, connecting food donors with recipient organizations while providing powerful analytics to improve food security.

## 🌟 Features

### Multi-Role System
- **Admin**: Manage platform content, oversee user interactions, and ensure data accuracy
- **Food Donor**: List surplus food, coordinate donations, and track environmental impact
- **Recipient Organization**: Request food donations, manage logistics, and distribute to those in need
- **Data Analyst**: Track food waste trends, analyze data, and generate insightful reports

### Key Capabilities
- ✅ Full CRUD operations for donations and requests
- ✅ Role-based authentication and authorization
- ✅ Real-time data persistence using localStorage
- ✅ Interactive data visualizations with Recharts
- ✅ Responsive design for all devices
- ✅ Smooth animations with Framer Motion
- ✅ Comprehensive form validation
- ✅ Impact tracking and analytics
- ✅ User-friendly routing with React Router

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## 🔐 Demo Accounts

Quick login credentials for testing different roles:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@greenbites.com | admin123 |
| Donor | donor@example.com | donor123 |
| Recipient | recipient@example.com | recipient123 |
| Analyst | analyst@example.com | analyst123 |

## 📦 Tech Stack

- **Frontend Framework**: React 19
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Styling**: Custom CSS with CSS Variables

## 🎨 Features Breakdown

### Authentication System
- Secure login and registration
- Form validation with real-time feedback
- Password strength requirements
- Role-based access control
- Session persistence

### Food Donor Dashboard
- **Dashboard**: Overview of donation statistics and impact
- **My Donations**: Full CRUD operations for managing food listings
- **Impact**: Visualize environmental impact with charts and achievements

### Recipient Organization Dashboard
- **Dashboard**: Summary of available donations and requests
- **Browse Donations**: Search and filter available food donations
- **My Requests**: Create and manage food requests with category selection

### Data Analyst Dashboard
- **Dashboard**: Comprehensive analytics overview
- **Reports**: Generate and download detailed reports
- **Trends**: Track growth metrics and performance indicators

### Admin Dashboard
- **Overview**: Monitor platform activity and health
- **User Management**: View and manage all platform users
- **Donation Management**: Oversee all donation listings
- **Analytics**: Track platform-wide performance metrics

## 💾 Data Persistence

The application uses browser localStorage for data persistence:
- User accounts and authentication
- Donations and requests
- All CRUD operations are persisted
- Demo data is automatically initialized on first load

## 🎯 Validation & Error Handling

- Required field validation
- Email format validation
- Password strength requirements
- Date validation (expiry dates must be in future)
- Quantity and numeric validations
- Real-time error messages
- Success notifications for all operations

## 📱 Responsive Design

- Mobile-first approach
- Tablet and desktop optimized
- Flexible grid systems
- Touch-friendly interface

## 🎭 Animations

- Page transitions with Framer Motion
- Smooth hover effects
- Loading states
- Modal animations
- Chart animations

## 📊 Data Visualizations

- Line charts for trend analysis
- Bar charts for comparisons
- Pie charts for distribution
- Area charts for growth metrics
- Radar charts for performance analysis

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🌐 Project Structure

```
greenbites/
├── src/
│   ├── components/
│   │   └── DashboardLayout.jsx
│   ├── contexts/
│   │   ├── AuthContext.jsx
│   │   └── DataContext.jsx
│   ├── pages/
│   │   ├── admin/
│   │   ├── analyst/
│   │   ├── donor/
│   │   ├── recipient/
│   │   ├── LandingPage.jsx
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── utils/
│   │   └── initData.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── public/
├── package.json
└── README.md
```

## 🎨 Design Philosophy

GreenBites was built with a focus on:
- **User Experience**: Intuitive navigation and clear visual hierarchy
- **Accessibility**: Semantic HTML and keyboard navigation
- **Performance**: Optimized rendering and lazy loading
- **Scalability**: Modular component architecture
- **Consistency**: Unified design system and reusable components

## 🌍 Environmental Impact

The platform tracks and displays:
- Total food saved (kg)
- CO₂ emissions prevented
- Number of people fed
- Waste reduction percentage

## 🤝 Contributing

This is a demonstration project showcasing modern React development practices.

## 📄 License

This project was created for educational purposes.

## 🙏 Acknowledgments

- Food waste statistics from UN FAO
- Icons by Lucide
- Charts powered by Recharts
- Built with Vite and React

---

**Note**: This is a front-end demonstration project using localStorage for data persistence. For production use, implement proper backend authentication and database integration.
