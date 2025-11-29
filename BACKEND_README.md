# GreenBites Backend - MongoDB Atlas Integration

## Setup Instructions

### 1. Install Dependencies

Navigate to the server directory and install packages:

```bash
cd server
npm install
```

### 2. Environment Variables

The `.env` file is already configured with your MongoDB Atlas connection string:

```env
MONGODB_URI=
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_2024
NODE_ENV=development
```

### 3. Start the Backend Server

From the `server` directory:

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

You should see:
```
✅ Connected to MongoDB Atlas
🚀 Server running on http://localhost:5000
```

### 4. Install Axios in Frontend

Navigate to the main project directory and install axios:

```bash
cd ..
npm install axios
```

### 5. Start the Frontend

```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Users
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin only)

### Donations
- `GET /api/donations` - Get all donations
- `GET /api/donations/donor/:donorId` - Get donations by donor
- `GET /api/donations/available` - Get available donations
- `POST /api/donations` - Create new donation
- `PUT /api/donations/:id` - Update donation
- `DELETE /api/donations/:id` - Delete donation

### Requests
- `GET /api/requests` - Get all requests
- `GET /api/requests/recipient/:recipientId` - Get requests by recipient
- `POST /api/requests` - Create new request
- `PUT /api/requests/:id` - Update request
- `DELETE /api/requests/:id` - Delete request

## What Changed

### Backend (NEW)
- ✅ Created Express.js server
- ✅ Connected to MongoDB Atlas
- ✅ Created User, Donation, Request models with Mongoose
- ✅ Implemented JWT authentication
- ✅ Created RESTful API endpoints
- ✅ Added authentication middleware

### Frontend (UPDATED)
- ✅ Created `src/services/api.js` - Axios service for API calls
- ✅ Updated `src/contexts/AuthContext.jsx` - Now uses API instead of localStorage
- ✅ All authentication now goes through MongoDB

### What Still Needs Update

You need to update these files to use the API service instead of localStorage:

1. **Donor Pages** - Replace localStorage donation CRUD with API calls
2. **Recipient Pages** - Replace localStorage request CRUD with API calls
3. **Admin Pages** - Replace localStorage user management with API calls
4. **Remove** `src/utils/initData.js` - No longer needed

## Demo Users (Need to be registered through the app)

After starting the server, you can register users with these roles:
- **Admin**: admin@greenbites.com / admin123
- **Donor**: donor@example.com / donor123
- **Recipient**: recipient@example.com / recipient123
- **Analyst**: analyst@example.com / analyst123

## Testing

1. Start backend: `cd server && npm start`
2. Start frontend: `npm run dev`
3. Register a new user or login
4. Data will be stored in MongoDB Atlas
5. Check your MongoDB Atlas dashboard to see the data

## Troubleshooting

**MongoDB Connection Error:**
- Verify your IP is whitelisted in MongoDB Atlas
- Check internet connection
- Verify connection string is correct

**CORS Error:**
- Backend is configured to allow all origins
- Make sure backend is running on port 5000

**Authentication Error:**
- Clear browser localStorage
- Make sure JWT_SECRET is set in .env
- Token expires after 7 days

## Project Structure

```
greenbites/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Donation.js
│   │   └── Request.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── donations.js
│   │   ├── requests.js
│   │   └── users.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── src/
│   ├── services/
│   │   └── api.js (NEW)
│   ├── contexts/
│   │   └── AuthContext.jsx (UPDATED)
│   └── ...
```
