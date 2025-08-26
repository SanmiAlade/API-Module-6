# README.md

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
```

### Available Scripts
```bash
npm start       # Start production server
npm run dev     # Start development server with nodemon
```

## 📊 Usage Examples

### Testing with cURL

#### Users
```bash
# Get all users
curl http://localhost:3000/api/users

# Get users with filtering
curl "http://localhost:3000/api/users?role=admin&limit=5"

# Create a new user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Johnson","email":"alice@example.com","role":"user"}'

# Update a user
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"John Updated","role":"admin"}'

# Delete a user
curl -X DELETE http://localhost:3000/api/users/1
```

#### Products
```bash
# Get all products
curl http://localhost:3000/api/products

# Get products with filtering
curl "http://localhost:3000/api/products?category=Electronics&inStock=true"

# Create a new product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Smartphone","price":699.99,"category":"Electronics","description":"Latest model smartphone"}'

# Update a product
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price":1199.99,"inStock":false}'
```

### Query Parameters

#### Users Endpoint
- `role` - Filter by user role (admin/user)
- `search` - Search in name or email fields
- `limit` - Limit number of results
- `offset` - Skip number of results (pagination)

#### Products Endpoint
- `category` - Filter by product category
- `inStock` - Filter by stock status (true/false)
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `search` - Search in name or description fields
- `limit` - Limit number of results
- `offset` - Skip number of results (pagination)

## 📖 API Response Format

### Success Response
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Optional success message",
  "pagination": { /* pagination info for lists */ }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```

### Pagination Object
```json
{
  "pagination": {
    "total": 25,
    "count": 10,
    "offset": 0,
    "limit": 10
  }
}
```

## 🔐 Data Models

### User Model
```javascript
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "admin", // "admin" or "user"
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-16T11:00:00Z" // only on updates
}
```

### Product Model
```javascript
{
  "id": 1,
  "name": "Gaming Laptop",
  "price": 1299.99,
  "category": "Electronics",
  "inStock": true,
  "description": "High-performance gaming laptop",
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-16T11:00:00Z" // only on updates
}
```

## 🚦 HTTP Status Codes

- **200** - OK (successful GET, PUT, DELETE)
- **201** - Created (successful POST)
- **400** - Bad Request (validation errors, invalid input)
- **404** - Not Found (resource doesn't exist)
- **409** - Conflict (duplicate email, etc.)
- **500** - Internal Server Error (server issues)

## 🛡️ Security Features

- **Helmet.js**: Security headers middleware
- **CORS**: Cross-Origin Resource Sharing enabled
- **Input Validation**: Server-side validation for all inputs
- **Email Validation**: Proper email format checking
- **Data Sanitization**: Trimming and cleaning input data

## 🔧 Development Notes

### Data Storage
- Currently uses in-memory storage (arrays)
- Data resets when server restarts
- Replace with database (MongoDB, PostgreSQL, etc.) for production

### Recommended Improvements
1. **Database Integration**: Replace in-memory storage
2. **Authentication**: Add JWT or OAuth2
3. **Rate Limiting**: Implement API rate limiting
4. **Logging**: Add structured logging (Winston, Morgan)
5. **Testing**: Unit and integration tests
6. **Validation Library**: Use Joi or Yup for complex validation
7. **Documentation**: Swagger/OpenAPI documentation

## 📁 Project Structure

```
ai-backend-api/
├── package.json          # Project configuration
├── server.js             # Main server file
├── README.md             # This documentation
├── api-docs.md           # Detailed API documentation
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
└── node_modules/         # Dependencies (after npm install)
```

## 🤝 Contributing

1. Follow existing code style and patterns
2. Add proper error handling for new features
3. Update documentation for any API changes
4. Test all endpoints thoroughly

## 📄 License

MIT License - Feel free to use this project for learning or as a starting point for your applications.

## 📞 Support

For questions or issues:
1. Check the detailed API documentation in `api-docs.md`
2. Test endpoints using the provided cURL examples
3. Verify server is running on correct port
4. Check console logs for error messages

---

**Note**: This is Activity 1 of a larger assignment focusing on README and API documentation creation using AI assistance.

---

# api-docs.md

# API Documentation

Comprehensive API documentation for the AI Backend API with detailed examples and use cases.

## Base URL
```
http://localhost:3000
```

## Authentication
Currently no authentication required. All endpoints are publicly accessible.

> **Production Note**: Implement authentication (JWT, OAuth2) before deploying to production.

---

## Response Format

All API responses follow a consistent structure:

### Success Response
```json
{
  "success": true,
  "data": {}, // or []
  "message": "Optional success message",
  "pagination": {} // for paginated results
}
```

### Error Response
```json
{
  "success": false,
  "message": "Human-readable error description",
  "error": "Technical error details (development only)"
}
```

---

## System Endpoints

### GET /
Get API information and available endpoints.

**Response:**
```json
{
  "message": "Welcome to the AI Backend API",
  "version": "1.0.0",
  "documentation": "/api-docs",
  "endpoints": {
    "health": "/health",
    "users": "/api/users",
    "products": "/api/products"
  }
}
```

### GET /health
Health check endpoint to verify API status.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2025-08-24T10:30:00.000Z",
  "version": "1.0.0",
  "environment": "development"
}
```

---

## Users API

### GET /api/users
Retrieve all users with optional filtering and pagination.

**Query Parameters:**

| Parameter | Type   | Description               | Example      |
|-----------|--------|---------------------------|--------------|
| `role`    | string | Filter by user role       | `admin`, `user` |
| `search`  | string | Search in name or email   | `john`       |
| `limit`   | number | Limit number of results   | `10`         |
| `offset`  | number | Skip number of results    | `20`         |

**Examples:**
```bash
# Get all users
GET /api/users

# Get admin users only
GET /api/users?role=admin

# Search for users
GET /api/users?search=john

# Paginated results
GET /api/users?limit=5&offset=10

# Combined filters
GET /api/users?role=user&limit=10&search=smith
```

**Success Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "admin",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "total": 3,
    "count": 1,
    "offset": 0,
    "limit": null
  }
}
```

### GET /api/users/:id
Retrieve a specific user by ID.

**Parameters:**

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `id`      | number | Yes      | User ID     |

**Example:**
```bash
GET /api/users/1
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "User not found"
}
```

### POST /api/users
Create a new user.

**Request Body:**
```json
{
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "role": "user"
}
```

**Body Parameters:**

| Parameter | Type   | Required | Description           | Default |
|-----------|--------|----------|-----------------------|---------|
| `name`    | string | Yes      | User's full name      | -       |
| `email`   | string | Yes      | Valid email address   | -       |
| `role`    | string | No       | User role             | `user`  |

**Validation Rules:**
- `name`: Must not be empty
- `email`: Must be valid email format and unique
- `role`: Must be either "admin" or "user"

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 4,
    "name": "Alice Johnson",
    "email": "alice@example.com",
    "role": "user",
    "createdAt": "2025-08-24T10:30:00Z"
  },
  "message": "User created successfully"
}
```

**Error Response (400 - Validation):**
```json
{
  "success": false,
  "message": "Name and email are required"
}
```

**Error Response (409 - Duplicate Email):**
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

### PUT /api/users/:id
Update an existing user.

**Parameters:**

| Parameter | Type   | Required | Description        |
|-----------|--------|----------|--------------------|
| `id`      | number | Yes      | User ID to update  |

**Request Body (all fields optional):**
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "role": "admin"
}
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Updated",
    "email": "john.updated@example.com",
    "role": "admin",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2025-08-24T10:30:00Z"
  },
  "message": "User updated successfully"
}
```

### DELETE /api/users/:id
Delete a user.

**Parameters:**

| Parameter | Type   | Required | Description        |
|-----------|--------|----------|--------------------|
| `id`      | number | Yes      | User ID to delete  |

**Success Response:**
```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": {
    "id": 1,
    "name": "John Doe"
  }
}
```

---

## Products API

### GET /api/products
Retrieve all products with optional filtering and pagination.

**Query Parameters:**

| Parameter  | Type    | Description                  | Example       |
|------------|---------|------------------------------|---------------|
| `category` | string  | Filter by product category   | `Electronics` |
| `inStock`  | boolean | Filter by stock status       | `true`, `false` |
| `minPrice` | number  | Minimum price filter         | `50`          |
| `maxPrice` | number  | Maximum price filter         | `1000`        |
| `search`   | string  | Search in name or description| `laptop`      |
| `limit`    | number  | Limit number of results      | `10`          |
| `offset`   | number  | Skip number of results       | `20`          |

**Examples:**
```bash
# Get all products
GET /api/products

# Get Electronics products only
GET /api/products?category=Electronics

# Get products in stock
GET /api/products?inStock=true

# Price range filter
GET /api/products?minPrice=100&maxPrice=500

# Search products
GET /api/products?search=gaming

# Combined filters
GET /api/products?category=Electronics&inStock=true&maxPrice=1500
```

**Success Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Gaming Laptop",
      "price": 1299.99,
      "category": "Electronics",
      "inStock": true,
      "description": "High-performance gaming laptop with RTX graphics"
    }
  ],
  "pagination": {
    "total": 3,
    "count": 1,
    "offset": 0,
    "limit": null
  }
}
```

### GET /api/products/:id
Retrieve a specific product by ID.

**Parameters:**

| Parameter | Type   | Required | Description |
|-----------|--------|----------|-------------|
| `id`      | number | Yes      | Product ID  |

**Example:**
```bash
GET /api/products/1
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Gaming Laptop",
    "price": 1299.99,
    "category": "Electronics",
    "inStock": true,
    "description": "High-performance gaming laptop with RTX graphics"
  }
}
```

### POST /api/products
Create a new product.

**Request Body:**
```json
{
  "name": "Wireless Mouse",
  "price": 49.99,
  "category": "Electronics",
  "inStock": true,
  "description": "Ergonomic wireless mouse with long battery life"
}
```

**Body Parameters:**

| Parameter     | Type    | Required | Description              | Default |
|---------------|---------|----------|--------------------------|---------|
| `name`        | string  | Yes      | Product name             | -       |
| `price`       | number  | Yes      | Product price (positive) | -       |
| `category`    | string  | Yes      | Product category         | -       |
| `inStock`     | boolean | No       | Stock availability       | `true`  |
| `description` | string  | No       | Product description      | `""`    |

**Success Response (201):**
```json
{
  "success": true,
  "data": {
    "id": 4,
    "name": "Wireless Mouse",
    "price": 49.99,
    "category": "Electronics",
    "inStock": true,
    "description": "Ergonomic wireless mouse with long battery life",
    "createdAt": "2025-08-24T10:30:00Z"
  },
  "message": "Product created successfully"
}
```

### PUT /api/products/:id
Update an existing product.

**Parameters:**

| Parameter | Type   | Required | Description           |
|-----------|--------|----------|-----------------------|
| `id`      | number | Yes      | Product ID to update  |

**Request Body (all fields optional):**
```json
{
  "name": "Premium Gaming Laptop",
  "price": 1499.99,
  "inStock": false
}
```

**Success Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Premium Gaming Laptop",
    "price": 1499.99,
    "category": "Electronics",
    "inStock": false,
    "description": "High-performance gaming laptop with RTX graphics",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2025-08-24T10:30:00Z"
  },
  "message": "Product updated successfully"
}
```

### DELETE /api/products/:id
Delete a product.

**Parameters:**

| Parameter | Type   | Required | Description           |
|-----------|--------|----------|-----------------------|
| `id`      | number | Yes      | Product ID to delete  |

**Success Response:**
```json
{
  "success": true,
  "message": "Product deleted successfully",
  "data": {
    "id": 1,
    "name": "Gaming Laptop"
  }
}
```

---

## Error Handling

### Common Error Responses

#### 400 Bad Request
Invalid request data or validation errors.
```json
{
  "success": false,
  "message": "Invalid user ID format"
}
```

#### 404 Not Found
Resource doesn't exist.
```json
{
  "success": false,
  "message": "User not found"
}
```

#### 409 Conflict
Resource conflict (e.g., duplicate email).
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

#### 500 Internal Server Error
Server-side error.
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Testing Examples

### Using cURL

#### Complete User Workflow
```bash
# 1. Create a user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","role":"user"}'

# 2. Get all users
curl http://localhost:3000/api/users

# 3. Get specific user
curl http://localhost:3000/api/users/1

# 4. Update user
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated User"}'

# 5. Delete user
curl -X DELETE http://localhost:3000/api/users/1
```

#### Complete Product Workflow
```bash
# 1. Create a product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","price":99.99,"category":"Test","description":"A test product"}'

# 2. Get all products
curl http://localhost:3000/api/products

# 3. Filter products
curl "http://localhost:3000/api/products?category=Electronics&inStock=true"

# 4. Search products
curl "http://localhost:3000/api/products?search=laptop"

# 5. Update product
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"price":899.99,"inStock":false}'

# 6. Delete product
curl -X DELETE http://localhost:3000/api/products/1
```

### Using JavaScript/Fetch

#### Create User Example
```javascript
const createUser = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'Jane Doe',
        email: 'jane.doe@example.com',
        role: 'admin'
      })
    });

    const data = await response.json();
    console.log('User created:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

#### Get Products with Filtering
```javascript
const getFilteredProducts = async () => {
  try {
    const params = new URLSearchParams({
      category: 'Electronics',
      inStock: 'true',
      maxPrice: '1000',
      limit: '10'
    });

    const response = await fetch(`http://localhost:3000/api/products?${params}`);
    const data = await response.json();
    console.log('Filtered products:', data);
  } catch (error) {
    console.error('Error:', error);
  }
};
```

---

## Rate Limiting & Security

### Current Security Measures
- **Helmet.js**: Basic security headers
- **CORS**: Cross-origin requests enabled
- **Input Validation**: Server-side validation
- **Error Sanitization**: Clean error responses

### Recommended for Production
1. **Authentication**: JWT or OAuth2 implementation
2. **Rate Limiting**: Prevent API abuse
3. **Request Size Limits**: Prevent large payloads
4. **HTTPS**: Secure communication
5. **API Keys**: Track and limit usage
6. **Input Sanitization**: Prevent injection attacks

---

## Pagination Details

### Parameters
- `limit`: Maximum number of records to return
- `offset`: Number of records to skip

### Response Format
```json
{
  "pagination": {
    "total": 50,      // Total records available
    "count": 10,      // Records in current response
    "offset": 20,     // Records skipped
    "limit": 10       // Maximum records requested
  }
}
```

### Example Usage
```bash
# Get first 10 users
GET /api/users?limit=10&offset=0

# Get next 10 users
GET /api/users?limit=10&offset=10

# Get users 21-30
GET /api/users?limit=10&offset=20
```

---

## Data Models

### User Schema
```typescript
interface User {
  id: number;              // Auto-generated unique ID
  name: string;            // User's full name
  email: string;           // Unique email address
  role: 'admin' | 'user';  // User role
  createdAt: string;       // ISO timestamp
  updatedAt?: string;      // ISO timestamp (only on updates)
}
```

### Product Schema
```typescript
interface Product {
  id: number;          // Auto-generated unique ID
  name: string;        // Product name
  price: number;       // Product price (positive number)
  category: string;    // Product category
  inStock: boolean;    // Stock availability
  description: string; // Product description
  createdAt: string;   // ISO timestamp
  updatedAt?: string;  // ISO timestamp (only on updates)
}
```

---

## Common Use Cases

### User Management System
```bash
# Admin dashboard: Get all users with pagination
GET /api/users?limit=20&offset=0

# User search: Find users by name or email
GET /api/users?search=john

# Role management: Get all admin users
GET /api/users?role=admin
```

### Product Catalog
```bash
# Product listing: Get products by category
GET /api/products?category=Electronics&limit=12

# Product search: Find products by name
GET /api/products?search=laptop

# Inventory check: Get out-of-stock products
GET /api/products?inStock=false

# Price filtering: Products under $100
GET /api/products?maxPrice=100
```

### E-commerce Integration
```bash
# Category page: Electronics under $500
GET /api/products?category=Electronics&maxPrice=500&inStock=true

# User profile: Get user details
GET /api/users/123

# Product details: Get product information
GET /api/products/456
```

---

## Troubleshooting

### Common Issues

1. **Server not starting**
   - Check if port 3000 is available
   - Verify Node.js installation
   - Run `npm install` to install dependencies

2. **404 errors**
   - Verify correct endpoint URLs
   - Check HTTP method (GET, POST, PUT, DELETE)
   - Ensure server is running

3. **Validation errors**
   - Check required fields in request body
   - Verify data types (string, number, boolean)
   - Ensure email format is valid

4. **CORS issues**
   - CORS is enabled for all origins
   - Check browser console for CORS errors
   - Verify request headers

### Debug Mode
Start server with debug logging:
```bash
NODE_ENV=development npm start
```

This will show detailed error messages in responses.

---

**Last Updated**: August 24, 2025
**API Version**: 1.0.0
**Documentation Version**: 1.0.0