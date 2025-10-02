# Crypto Wallet Tracker

A comprehensive Bitcoin wallet tracking and analytics application built with Node.js, Express, React, and MongoDB.

## Features

- 🔐 **User Authentication** - Secure registration and login system
- 🔍 **Wallet Search** - Search and analyze Bitcoin wallets
- 📊 **Transaction Analytics** - Detailed transaction history and statistics
- 👤 **User Management** - Profile management and settings
- 🛡️ **Admin Panel** - Administrative controls and monitoring
- 🔒 **Security** - Rate limiting, input validation, and secure headers

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation
- **helmet** - Security headers
- **express-rate-limit** - Rate limiting

### Frontend
- **React** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Router** - Navigation
- **Recharts** - Data visualization

## Project Structure

```
CryptoWalletTracker/
├── Docs/                    # Documentation
├── Project/
│   ├── backend/            # Node.js/Express API
│   │   ├── config/         # Database configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   └── utils/          # Utility functions
│   └── frontend/           # React application
│       ├── public/         # Static assets
│       └── src/            # React components and logic
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd Project/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure environment variables in `.env`:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key_minimum_32_characters
   PORT=5000
   NODE_ENV=development
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd Project/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - User logout

### User Management
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `PUT /api/user/password` - Change password

### Wallet Operations
- `POST /api/wallet/search` - Search and analyze wallet
- `GET /api/wallet/:address` - Get wallet info

### Search History
- `GET /api/search` - Get search history
- `GET /api/search/:id` - Get specific search

### Admin Panel
- `GET /api/admin/users` - Get all users
- `GET /api/admin/stats` - Get system statistics

## Features

### Bitcoin Address Support
- **Legacy P2PKH** addresses (starting with `1`)
- **Legacy P2SH** addresses (starting with `3`)
- **Bech32 SegWit** addresses (starting with `bc1`)

### Security Features
- Input validation and sanitization
- Rate limiting (100 requests/15min general, 5 requests/15min auth)
- Secure HTTP headers with Helmet
- JWT-based authentication
- Password hashing with bcrypt
- Environment variable validation

### Analytics Features
- Transaction history analysis
- Wallet balance tracking
- Connected wallet discovery
- Transaction timeline visualization
- Large transaction detection

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue on GitHub.