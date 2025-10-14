# 🚀 Crypto Wallet Tracker API Testing Guide

## Base URL
```
http://localhost:5000
```

## 🔧 Quick Test Commands (Copy & Paste)

### 1. Test Health Check
```bash
curl http://localhost:5000/api/health
```

### 2. Register a New User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Password123!",
    "confirmPassword": "Password123!"
  }'
```

### 3. Login User
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123!"
  }'
```

### 4. Get Current User (Replace YOUR_JWT_TOKEN)
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 5. Get User Profile
```bash
curl -X GET http://localhost:5000/api/user/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### 6. Search Wallet
```bash
curl -X POST http://localhost:5000/api/wallet/search \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "address": "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
  }'
```

### 7. Get Search History
```bash
curl -X GET http://localhost:5000/api/search/history \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 📋 Thunder Client Collection

Import this JSON into Thunder Client:

```json
{
  "client": "Thunder Client",
  "collectionName": "Crypto Wallet Tracker API",
  "dateExported": "2025-10-14",
  "version": "1.1",
  "folders": [
    {
      "id": "auth-folder",
      "name": "Authentication",
      "containerId": "",
      "created": "2025-10-14T12:00:00.000Z",
      "sortNum": 10000
    },
    {
      "id": "user-folder", 
      "name": "User Management",
      "containerId": "",
      "created": "2025-10-14T12:00:00.000Z",
      "sortNum": 20000
    },
    {
      "id": "wallet-folder",
      "name": "Wallet Operations", 
      "containerId": "",
      "created": "2025-10-14T12:00:00.000Z",
      "sortNum": 30000
    },
    {
      "id": "search-folder",
      "name": "Search History",
      "containerId": "",
      "created": "2025-10-14T12:00:00.000Z", 
      "sortNum": 40000
    },
    {
      "id": "admin-folder",
      "name": "Admin Operations",
      "containerId": "",
      "created": "2025-10-14T12:00:00.000Z",
      "sortNum": 50000
    }
  ],
  "requests": [
    {
      "id": "health-check",
      "name": "Health Check",
      "url": "{{baseUrl}}/api/health",
      "method": "GET",
      "sortNum": 5000,
      "created": "2025-10-14T12:00:00.000Z",
      "headers": [],
      "tests": []
    },
    {
      "id": "register",
      "name": "Register User",
      "url": "{{baseUrl}}/api/auth/register",
      "method": "POST",
      "sortNum": 10000,
      "created": "2025-10-14T12:00:00.000Z",
      "containerId": "auth-folder",
      "headers": [{"name": "Content-Type", "value": "application/json"}],
      "body": {
        "type": "json",
        "raw": "{\n  \"username\": \"testuser\",\n  \"email\": \"test@example.com\",\n  \"password\": \"Password123!\",\n  \"confirmPassword\": \"Password123!\"\n}"
      }
    },
    {
      "id": "login",
      "name": "Login User", 
      "url": "{{baseUrl}}/api/auth/login",
      "method": "POST",
      "sortNum": 10010,
      "created": "2025-10-14T12:00:00.000Z",
      "containerId": "auth-folder",
      "headers": [{"name": "Content-Type", "value": "application/json"}],
      "body": {
        "type": "json",
        "raw": "{\n  \"email\": \"test@example.com\",\n  \"password\": \"Password123!\"\n}"
      },
      "tests": [{
        "type": "set-env-var",
        "custom": "json.token",
        "action": "setto",
        "value": "{{token}}"
      }]
    },
    {
      "id": "get-me",
      "name": "Get Current User",
      "url": "{{baseUrl}}/api/auth/me", 
      "method": "GET",
      "sortNum": 10020,
      "created": "2025-10-14T12:00:00.000Z",
      "containerId": "auth-folder",
      "headers": [{"name": "Authorization", "value": "Bearer {{token}}"}]
    },
    {
      "id": "logout",
      "name": "Logout User",
      "url": "{{baseUrl}}/api/auth/logout",
      "method": "POST", 
      "sortNum": 10030,
      "created": "2025-10-14T12:00:00.000Z",
      "containerId": "auth-folder",
      "headers": [{"name": "Authorization", "value": "Bearer {{token}}"}]
    },
    {
      "id": "get-profile",
      "name": "Get Profile",
      "url": "{{baseUrl}}/api/user/profile",
      "method": "GET",
      "sortNum": 20000,
      "created": "2025-10-14T12:00:00.000Z", 
      "containerId": "user-folder",
      "headers": [{"name": "Authorization", "value": "Bearer {{token}}"}]
    },
    {
      "id": "search-wallet",
      "name": "Search Wallet",
      "url": "{{baseUrl}}/api/wallet/search",
      "method": "POST",
      "sortNum": 30000,
      "created": "2025-10-14T12:00:00.000Z",
      "containerId": "wallet-folder", 
      "headers": [
        {"name": "Content-Type", "value": "application/json"},
        {"name": "Authorization", "value": "Bearer {{token}}"}
      ],
      "body": {
        "type": "json",
        "raw": "{\n  \"address\": \"1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa\"\n}"
      }
    },
    {
      "id": "get-search-history",
      "name": "Get Search History",
      "url": "{{baseUrl}}/api/search/history",
      "method": "GET",
      "sortNum": 40000,
      "created": "2025-10-14T12:00:00.000Z",
      "containerId": "search-folder",
      "headers": [{"name": "Authorization", "value": "Bearer {{token}}"}]
    }
  ],
  "environments": [
    {
      "id": "local-env",
      "name": "Local Environment", 
      "default": true,
      "data": [
        {"name": "baseUrl", "value": "http://localhost:5000"},
        {"name": "token", "value": ""}
      ]
    }
  ]
}
```

## 🎯 Testing Workflow

1. **Start with Health Check** - Verify server is running
2. **Register a User** - Create test account
3. **Login** - Get JWT token (save it!)
4. **Test Protected Routes** - Use the JWT token
5. **Test All Endpoints** - Go through each route systematically

## ⚡ Fastest Testing Method

1. **Install Thunder Client** (Already done! ✅)
2. **Import the JSON collection above**
3. **Set environment variable**: `baseUrl = http://localhost:5000`
4. **Run requests in order**
5. **Token will auto-save** from login response

## 🔑 Important Notes

- **JWT Token**: Copy from login response and use in Authorization header
- **Environment Variables**: Set `{{baseUrl}}` and `{{token}}`
- **Rate Limiting**: Don't spam requests too fast
- **Admin Routes**: Need admin role in JWT payload

## 🚨 Quick Verification Commands

Test if server is running:
```bash
curl http://localhost:5000/
```

Expected response:
```json
{
  "success": true,
  "message": "Crypto Wallet Tracker API",
  "version": "1.0.0",
  "endpoints": {...}
}
```