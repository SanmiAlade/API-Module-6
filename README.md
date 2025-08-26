# AI Backend API

A professional REST API built with Node.js and Express.js, featuring comprehensive user and product management with detailed documentation.

## 🚀 Features

- **RESTful API Design**: Clean, intuitive endpoints following REST principles
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality
- **Input Validation**: Comprehensive data validation and sanitization
- **Error Handling**: Detailed error responses with proper HTTP status codes
- **Security**: Basic security middleware with Helmet.js and CORS
- **Filtering & Pagination**: Query parameters for data filtering and pagination
- **Search Functionality**: Text search across multiple fields
- **Professional Documentation**: Detailed API documentation with examples

## 📋 API Endpoints

### System
- `GET /` - API information and available endpoints
- `GET /health` - Health check with system status

### Users
- `GET /api/users` - Get all users with filtering and pagination
- `GET /api/users/:id` - Get specific user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update existing user
- `DELETE /api/users/:id` - Delete user

### Products
- `GET /api/products` - Get all products with filtering and pagination
- `GET /api/products/:id` - Get specific product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update existing product
- `DELETE /api/products/:id` - Delete product

## 🛠 Installation & Setup

### Prerequisites
- Node.js (version 14.0.0 or higher)
- npm (Node Package Manager)

### Quick Start

1. **Extract the project files**
2. **Install dependencies**:
   ```bash
   npm install