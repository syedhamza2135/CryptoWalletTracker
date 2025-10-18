# 🎯 CryptoWalletTracker API Documentation for Frontend Development

## 📡 Base URL
```
http://localhost:5000
```

## 🔐 Authentication
All protected routes require JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

---

## 🚀 API Endpoints & Response Structures

### 1. **System Endpoints**

#### GET `/`
**Description:** API Info  
**Access:** Public  
**Response:**
```json
{
  "success": true,
  "message": "Crypto Wallet Tracker API",
  "version": "1.0.0",
  "endpoints": {
    "auth": "/api/auth",
    "user": "/api/user",
    "wallet": "/api/wallet",
    "search": "/api/search",
    "admin": "/api/admin"
  }
}
```

#### GET `/api/health`
**Description:** Health Check  
**Access:** Public  
**Response:**
```json
{
  "success": true,
  "message": "API is healthy",
  "timestamp": "2025-10-17T19:47:38.618Z",
  "uptime": 113.4072386
}
```

---

### 2. **Authentication Endpoints** (`/api/auth`)

#### POST `/api/auth/register`
**Description:** Register new user  
**Access:** Public  
**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "StrongPass123"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "68f29dad66f587a9fa82a6bf",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Validation Error Response (400):**
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "message": "Name is required"
    },
    {
      "field": "email",
      "message": "Please provide a valid email"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters long"
    }
  ]
}
```

#### POST `/api/auth/login`
**Description:** Login user  
**Access:** Public  
**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "StrongPass123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "68f29dad66f587a9fa82a6bf",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "lastLogin": "2025-10-17T19:49:15.348Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

#### GET `/api/auth/me`
**Description:** Get current user info  
**Access:** Private (requires token)  
**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "68f29dad66f587a9fa82a6bf",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "lastLogin": "2025-10-17T19:49:15.348Z",
      "createdAt": "2025-10-17T19:49:01.578Z"
    }
  }
}
```

#### POST `/api/auth/logout`
**Description:** Logout user  
**Access:** Private (requires token)  
**Response:**
```json
{
  "success": true,
  "message": "Logout successful"
}
```

---

### 3. **User Management Endpoints** (`/api/user`)

#### GET `/api/user/profile`
**Description:** Get user profile  
**Access:** Private  
**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "68f29dad66f587a9fa82a6bf",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "lastLogin": "2025-10-17T19:49:15.348Z",
      "createdAt": "2025-10-17T19:49:01.578Z"
    }
  }
}
```

#### PUT `/api/user/profile`
**Description:** Update user profile  
**Access:** Private  
**Request Body:**
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com"
}
```

#### PUT `/api/user/password`
**Description:** Change user password  
**Access:** Private  
**Request Body:**
```json
{
  "currentPassword": "OldPass123",
  "newPassword": "NewPass123"
}
```

---

### 4. **Wallet Operations** (`/api/wallet`)

#### POST `/api/wallet/search`
**Description:** Search wallet and save to history  
**Access:** Private  
**Request Body:**
```json
{
  "address": "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Wallet data fetched successfully",
  "data": {
    "address": "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
    "balance": 496944,
    "balanceBTC": "0.00496944",
    "totalTransactions": 5422,
    "totalReceived": 23635198508,
    "totalReceivedBTC": "236.35198508",
    "totalSent": 23634701564,
    "totalSentBTC": "236.34701564",
    "firstTransactionDate": "2023-12-02T18:38:20Z",
    "lastTransactionDate": "2025-10-10T05:00:30Z",
    "transactions": [
      {
        "hash": "8217d859b1e028bd6f59b7c33c3c6f2d4f0913155fe635555d2a40f28150189e",
        "time": "2025-10-10T05:00:30Z",
        "amount": 7910,
        "type": "received",
        "confirmations": "Confirmed"
      }
      // ... more transactions (typically 50 recent ones)
    ],
    "analytics": {
      "largestIncoming": 1099983,
      "largestIncomingBTC": "0.01099983",
      "largestOutgoing": 0,
      "largestOutgoingBTC": "0.00000000",
      "averageTransaction": 133364.7,
      "averageTransactionBTC": "0.00133365",
      "topConnectedWallets": [
        {
          "address": "bc1qprdf80adfz7aekh5nejjfrp3jksc8r929svpxk",
          "transactionCount": 4,
          "totalVolume": 12520395844
        }
        // ... more connected wallets
      ],
      "oneTimeWallets": 1167,
      "transactionTimeline": [
        {
          "month": "2025-10",
          "count": 3,
          "volume": 62759
        }
        // ... monthly data
      ]
    },
    "searchId": "68f29dfa66f587a9fa82a6ca"
  }
}
```

#### GET `/api/wallet/:address`
**Description:** Get wallet info (no save to history)  
**Access:** Private  
**Parameters:** 
- `address` - Bitcoin wallet address

---

### 5. **Search History** (`/api/search`)

#### GET `/api/search/history`
**Description:** Get user's search history  
**Access:** Private  
**Response:**
```json
{
  "success": true,
  "count": 1,
  "data": {
    "searches": [
      {
        "id": "68f29dfa66f587a9fa82a6ca",
        "walletAddress": "1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2",
        "balance": 496944,
        "balanceBTC": "0.00496944",
        "totalTransactions": 5422,
        "searchDate": "2025-10-17T19:50:18.522Z",
        "status": "success"
      }
    ]
  }
}
```

#### GET `/api/search/:id`
**Description:** Get single search details  
**Access:** Private  
**Parameters:**
- `id` - Search ID

#### DELETE `/api/search/:id`
**Description:** Delete specific search  
**Access:** Private  
**Parameters:**
- `id` - Search ID

#### DELETE `/api/search/history/clear`
**Description:** Clear all search history  
**Access:** Private

---

### 6. **Admin Endpoints** (`/api/admin`)

#### GET `/api/admin/stats`
**Description:** Get dashboard statistics  
**Access:** Private/Admin only

#### GET `/api/admin/users`
**Description:** Get all users  
**Access:** Private/Admin only

#### GET `/api/admin/users/:id`
**Description:** Get specific user details  
**Access:** Private/Admin only

#### DELETE `/api/admin/users/:id`
**Description:** Delete user  
**Access:** Private/Admin only

#### GET `/api/admin/searches`
**Description:** Get all searches  
**Access:** Private/Admin only

#### GET `/api/admin/analytics`
**Description:** Get search analytics  
**Access:** Private/Admin only

---

## 🎨 Frontend Implementation Notes

### 1. **Authentication Flow**
- Store JWT token in localStorage after successful login
- Include token in all API requests
- Redirect to login on 401 responses
- Clear token on logout

### 2. **Form Validation**
- Email validation
- Password requirements: 8+ chars, 1 number, 1 lowercase, 1 uppercase
- Bitcoin address validation: Legacy (1/3), Bech32 (bc1)

### 3. **Data Structures to Handle**
- User object with id, name, email, role, timestamps
- Wallet data with balance, transactions, analytics
- Transaction objects with hash, time, amount, type
- Error responses with field-specific messages

### 4. **UI Components Needed**
- Login/Register forms
- Dashboard with stats
- Wallet search form
- Transaction table
- Search history list
- Analytics charts
- User profile management

### 5. **State Management**
- User authentication state
- Current wallet data
- Search history
- Loading states
- Error handling

### 6. **Charts & Visualizations**
- Transaction timeline (monthly)
- Balance history
- Top connected wallets
- Transaction types pie chart

---

## 🔧 Error Handling

All errors follow this structure:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [  // For validation errors
    {
      "field": "fieldName",
      "message": "Field-specific error"
    }
  ]
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created (registration)
- `400` - Validation error
- `401` - Unauthorized
- `403` - Forbidden (admin only)
- `404` - Not found
- `500` - Server error

---

## 🎯 Recommended Frontend Stack

Based on the API structure, consider:
- **React** with JavaScript
- **Tailwind CSS** for styling
- **React Query/TanStack Query** for API state management
- **React Router** for navigation
- **Recharts** or **Chart.js** for analytics
- **React Hook Form** for form handling
- **Axios** for HTTP requests
- **Zustand** or **Context API** for global state

This API provides everything needed for a complete crypto wallet tracking application! 🚀