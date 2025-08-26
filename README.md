# AI Backend API

A professional REST API built with Node.js and Express.js, featuring comprehensive user and product management with detailed documentation.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Development](#development)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Features

- **RESTful API Design**: Clean, intuitive endpoints following REST principles
- **CRUD Operations**: Complete Create, Read, Update, Delete functionality for users and products
- **Input Validation**: Comprehensive data validation and sanitization
- **Error Handling**: Detailed error responses with proper HTTP status codes
- **Security**: Basic security middleware with Helmet.js and CORS protection
- **Filtering & Pagination**: Query parameters for advanced data filtering and pagination
- **Search Functionality**: Text search across multiple fields (name, email, description)
- **Professional Documentation**: Detailed API documentation with real-world examples
- **In-Memory Storage**: Quick setup for development and testing (production requires database)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 14.0.0 or higher ([Download here](https://nodejs.org/))
- **npm**: Usually comes with Node.js (version 6.0.0 or higher)
- **Git**: For cloning the repository ([Download here](https://git-scm.com/))

### Verify Installation

```bash
node --version    # Should show v14.0.0 or higher
npm --version     # Should show 6.0.0 or higher
```

## Installation

### Option 1: Clone from Repository (Recommended)

```bash
# Clone the repository
git clone <repository-url>
cd ai-backend-api

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Option 2: Manual Setup

1. **Extract project files** to your desired directory
2. **Navigate to project directory**:
   ```bash
   cd ai-backend-api
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create environment file**:
   ```bash
   # On Windows
   copy .env.example .env

   # On Mac/Linux
   cp .env.example .env
   ```

### Verify Installation

```bash
# Check if all dependencies are installed
npm list --depth=0

# Start the server in development mode
npm run dev
```

If successful, you should see:
```
🚀 AI Backend API Server Started
📡 Server running on http://localhost:3000
🏥 Health check: http://localhost:3000/health
```

## Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# For production, add:
# NODE_ENV=production
# PORT=8080
```

### Available Configuration Options

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port number | 3000 | No |
| `NODE_ENV` | Environment mode | development | No |

## Usage

### Starting the Server

#### Development Mode (Recommended for development)
```bash
npm run dev
```
- Uses nodemon for automatic restarts
- Shows detailed error messages
- Enables development features

#### Production Mode
```bash
npm start
```
- Optimized for performance
- Minimal logging
- Production error handling

### Quick Test

Once the server is running, test the API:

```bash
# Test health endpoint
curl http://localhost:3000/health

# Get all users
curl http://localhost:3000/api/users

# Get all products
curl http://localhost:3000/api/products
```

Expected response:
```json
{
  "success": true,
  "data": [...],
  "pagination": {...}
}
```

## API Endpoints

### System Endpoints
- `GET /` - API information and available endpoints
- `GET /health` - Health check with system status

### Users Management
- `GET /api/users` - Get all users with filtering and pagination
- `GET /api/users/:id` - Get specific user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update existing user
- `DELETE /api/users/:id` - Delete user

### Products Management
- `GET /api/products` - Get all products with filtering and pagination
- `GET /api/products/:id` - Get specific product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update existing product
- `DELETE /api/products/:id` - Delete product

### Query Parameters

#### Users Endpoint
- `role` - Filter by user role (`admin`, `user`)
- `search` - Search in name or email fields
- `limit` - Number of results to return
- `offset` - Number of results to skip

#### Products Endpoint
- `category` - Filter by product category
- `inStock` - Filter by stock status (`true`, `false`)
- `minPrice` / `maxPrice` - Price range filtering
- `search` - Search in name or description
- `limit` / `offset` - Pagination

For detailed API documentation with examples, see [api-docs.md](api-docs.md).

## Testing

### Manual Testing with cURL

#### Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "role": "admin"
  }'
```

#### Create a Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Laptop",
    "price": 999.99,
    "category": "Electronics",
    "description": "High-performance laptop"
  }'
```

#### Filter and Search
```bash
# Get admin users only
curl "http://localhost:3000/api/users?role=admin"

# Search products by name
curl "http://localhost:3000/api/products?search=laptop"

# Get products under $100
curl "http://localhost:3000/api/products?maxPrice=100"
```

### Testing Tools

- **Postman**: Import the API endpoints for interactive testing
- **Insomnia**: Alternative REST client
- **Thunder Client**: VS Code extension for API testing

## Development

### Project Structure
```
ai-backend-api/
├── package.json          # Project configuration and dependencies
├── server.js             # Main application file
├── README.md             # This file
├── api-docs.md           # Detailed API documentation
├── .env                  # Environment variables (create from .env.example)
├── .env.example          # Environment template
├── .gitignore            # Git ignore rules
└── node_modules/         # Dependencies (created by npm install)
```

### Development Workflow

1. **Make changes** to `server.js`
2. **Nodemon automatically restarts** the server
3. **Test endpoints** using curl or API client
4. **Check console logs** for debugging information
5. **Update documentation** if adding new features

### Code Style Guidelines

- Use consistent indentation (2 spaces)
- Follow existing error handling patterns
- Add proper input validation for new endpoints
- Update API documentation for changes
- Use meaningful variable and function names

## Deployment

### Production Considerations

**⚠️ Important: This API uses in-memory storage and is not production-ready without modifications.**

#### Required Changes for Production:
1. **Database Integration**: Replace in-memory arrays with a proper database (MongoDB, PostgreSQL, etc.)
2. **Authentication**: Implement JWT or OAuth2 authentication
3. **Rate Limiting**: Add API rate limiting to prevent abuse
4. **Environment Security**: Use proper environment variable management
5. **HTTPS**: Enable SSL/TLS encryption
6. **Process Management**: Use PM2 or similar for process management

#### Basic Deployment Steps:

1. **Set production environment**:
   ```bash
   export NODE_ENV=production
   export PORT=8080
   ```

2. **Install production dependencies only**:
   ```bash
   npm ci --only=production
   ```

3. **Start the server**:
   ```bash
   npm start
   ```

#### Recommended Hosting Platforms:
- **Heroku**: Easy deployment with automatic scaling
- **DigitalOcean**: Cost-effective VPS hosting
- **AWS EC2**: Enterprise-level cloud hosting
- **Vercel**: Serverless deployment option

## Troubleshooting

### Common Issues

#### Server won't start
```bash
Error: listen EADDRINUSE :::3000
```
**Solution**: Port 3000 is already in use
```bash
# Find process using port 3000
lsof -i :3000  # Mac/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process or change port in .env file
PORT=3001 npm run dev
```

#### Module not found errors
```bash
Error: Cannot find module 'express'
```
**Solution**: Dependencies not installed
```bash
npm install
```

#### Permission errors (Mac/Linux)
```bash
Error: EACCES: permission denied
```
**Solution**: Use proper permissions
```bash
sudo npm install -g nodemon  # If installing globally
# Or use npx instead: npx nodemon server.js
```

#### API returns 404 for all endpoints
- ✅ Verify server is running on correct port
- ✅ Check URL path (should be `/api/users`, not `/users`)
- ✅ Ensure you're using the right HTTP method (GET, POST, etc.)

#### CORS errors in browser
- ✅ CORS is enabled for all origins by default
- ✅ Check if you're sending proper headers
- ✅ Verify the API is running

### Debug Mode

Enable detailed logging:
```bash
NODE_ENV=development npm run dev
```

This shows:
- All incoming requests
- Detailed error messages
- Stack traces for debugging

### Getting Help

1. **Check the logs** in your terminal for error messages
2. **Verify your request format** matches the API documentation
3. **Test with simple curl commands** before using complex clients
4. **Check that all required fields** are included in POST/PUT requests

## Contributing

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/new-feature`
3. **Make your changes** following the code style guidelines
4. **Test your changes** thoroughly
5. **Update documentation** if needed
6. **Commit your changes**: `git commit -m "Add new feature"`
7. **Push to your fork**: `git push origin feature/new-feature`
8. **Submit a pull request**

### Development Setup for Contributors

```bash
# Fork and clone the repository
git clone https://github.com/yourusername/ai-backend-api.git
cd ai-backend-api

# Install dependencies
npm install

# Create development branch
git checkout -b feature/your-feature-name

# Start development server
npm run dev
```

### Reporting Issues

When reporting bugs, please include:
- Node.js and npm versions
- Operating system
- Error messages and stack traces
- Steps to reproduce the issue
- Expected vs actual behavior

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### Version 1.0.0
- Initial release with basic CRUD operations
- User and product management endpoints
- Input validation and error handling
- Basic security middleware
- Comprehensive documentation

---

**Note**: This API is designed for learning purposes and development. For production use, implement proper database storage, authentication, and additional security measures as outlined in the Deployment section.