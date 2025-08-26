const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
	console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
	next();
});

// In-memory data stores (replace with database in production)
const users = [
	{
		id: 1,
		name: "John Doe",
		email: "john@example.com",
		role: "admin",
		createdAt: "2024-01-15T10:30:00Z",
	},
	{
		id: 2,
		name: "Jane Smith",
		email: "jane@example.com",
		role: "user",
		createdAt: "2024-02-10T14:20:00Z",
	},
	{
		id: 3,
		name: "Mike Johnson",
		email: "mike@example.com",
		role: "user",
		createdAt: "2024-03-05T09:15:00Z",
	},
];

const products = [
	{
		id: 1,
		name: "Gaming Laptop",
		price: 1299.99,
		category: "Electronics",
		inStock: true,
		description: "High-performance gaming laptop with RTX graphics",
	},
	{
		id: 2,
		name: "Coffee Maker",
		price: 89.99,
		category: "Kitchen",
		inStock: true,
		description: "Automatic drip coffee maker with programmable timer",
	},
	{
		id: 3,
		name: "Wireless Headphones",
		price: 199.99,
		category: "Electronics",
		inStock: false,
		description: "Noise-canceling wireless headphones with 30-hour battery",
	},
];

// Helper functions
const getNextId = (array) => Math.max(...array.map((item) => item.id)) + 1;

const validateEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

// Routes

// Health check endpoint
app.get("/health", (req, res) => {
	res.json({
		status: "OK",
		timestamp: new Date().toISOString(),
		version: "1.0.0",
		environment: process.env.NODE_ENV || "development",
	});
});

// Root endpoint
app.get("/", (req, res) => {
	res.json({
		message: "Welcome to the AI Backend API",
		version: "1.0.0",
		documentation: "/api-docs",
		endpoints: {
			health: "/health",
			users: "/api/users",
			products: "/api/products",
		},
	});
});

// USER ENDPOINTS

// Get all users with filtering and pagination
app.get("/api/users", (req, res) => {
	try {
		const { role, limit, offset, search } = req.query;
		let filteredUsers = [...users];

		// Filter by role
		if (role) {
			filteredUsers = filteredUsers.filter(
				(user) => user.role.toLowerCase() === role.toLowerCase(),
			);
		}

		// Search by name or email
		if (search) {
			const searchLower = search.toLowerCase();
			filteredUsers = filteredUsers.filter(
				(user) =>
					user.name.toLowerCase().includes(searchLower) ||
					user.email.toLowerCase().includes(searchLower),
			);
		}

		// Apply pagination
		const totalUsers = filteredUsers.length;
		const startIndex = offset ? Number.parseInt(offset) : 0;
		const endIndex = limit
			? startIndex + Number.parseInt(limit)
			: filteredUsers.length;
		const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

		res.json({
			success: true,
			data: paginatedUsers,
			pagination: {
				total: totalUsers,
				count: paginatedUsers.length,
				offset: startIndex,
				limit: limit ? Number.parseInt(limit) : null,
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
});

// Get user by ID
app.get("/api/users/:id", (req, res) => {
	try {
		const userId = Number.parseInt(req.params.id);

		if (Number.isNaN(userId)) {
			return res.status(400).json({
				success: false,
				message: "Invalid user ID format",
			});
		}

		const user = users.find((u) => u.id === userId);

		if (!user) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		res.json({
			success: true,
			data: user,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
});

// Create new user
app.post("/api/users", (req, res) => {
	try {
		const { name, email, role = "user" } = req.body;

		// Validation
		if (!name || !email) {
			return res.status(400).json({
				success: false,
				message: "Name and email are required",
			});
		}

		if (!validateEmail(email)) {
			return res.status(400).json({
				success: false,
				message: "Invalid email format",
			});
		}

		// Check if email already exists
		const existingUser = users.find(
			(u) => u.email.toLowerCase() === email.toLowerCase(),
		);
		if (existingUser) {
			return res.status(409).json({
				success: false,
				message: "User with this email already exists",
			});
		}

		// Validate role
		const validRoles = ["admin", "user"];
		if (!validRoles.includes(role.toLowerCase())) {
			return res.status(400).json({
				success: false,
				message: 'Role must be either "admin" or "user"',
			});
		}

		const newUser = {
			id: getNextId(users),
			name: name.trim(),
			email: email.toLowerCase().trim(),
			role: role.toLowerCase(),
			createdAt: new Date().toISOString(),
		};

		users.push(newUser);

		res.status(201).json({
			success: true,
			data: newUser,
			message: "User created successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
});

// Update user
app.put("/api/users/:id", (req, res) => {
	try {
		const userId = Number.parseInt(req.params.id);

		if (Number.isNaN(userId)) {
			return res.status(400).json({
				success: false,
				message: "Invalid user ID format",
			});
		}

		const userIndex = users.findIndex((u) => u.id === userId);

		if (userIndex === -1) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		const { name, email, role } = req.body;

		// Validation
		if (email && !validateEmail(email)) {
			return res.status(400).json({
				success: false,
				message: "Invalid email format",
			});
		}

		if (role && !["admin", "user"].includes(role.toLowerCase())) {
			return res.status(400).json({
				success: false,
				message: 'Role must be either "admin" or "user"',
			});
		}

		// Check if email is taken by another user
		if (email) {
			const existingUser = users.find(
				(u) => u.email.toLowerCase() === email.toLowerCase() && u.id !== userId,
			);
			if (existingUser) {
				return res.status(409).json({
					success: false,
					message: "Email is already in use by another user",
				});
			}
		}

		// Update user
		const updatedUser = {
			...users[userIndex],
			...(name && { name: name.trim() }),
			...(email && { email: email.toLowerCase().trim() }),
			...(role && { role: role.toLowerCase() }),
			updatedAt: new Date().toISOString(),
		};

		users[userIndex] = updatedUser;

		res.json({
			success: true,
			data: updatedUser,
			message: "User updated successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
});

// Delete user
app.delete("/api/users/:id", (req, res) => {
	try {
		const userId = Number.parseInt(req.params.id);

		if (Number.isNaN(userId)) {
			return res.status(400).json({
				success: false,
				message: "Invalid user ID format",
			});
		}

		const userIndex = users.findIndex((u) => u.id === userId);

		if (userIndex === -1) {
			return res.status(404).json({
				success: false,
				message: "User not found",
			});
		}

		const deletedUser = users[userIndex];
		users.splice(userIndex, 1);

		res.json({
			success: true,
			message: "User deleted successfully",
			data: { id: deletedUser.id, name: deletedUser.name },
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
});

// PRODUCT ENDPOINTS

// Get all products with filtering and pagination
app.get("/api/products", (req, res) => {
	try {
		const { category, inStock, minPrice, maxPrice, limit, offset, search } =
			req.query;
		let filteredProducts = [...products];

		// Filter by category
		if (category) {
			filteredProducts = filteredProducts.filter(
				(p) => p.category.toLowerCase() === category.toLowerCase(),
			);
		}

		// Filter by stock status
		if (inStock !== undefined) {
			const stockFilter = inStock.toLowerCase() === "true";
			filteredProducts = filteredProducts.filter(
				(p) => p.inStock === stockFilter,
			);
		}

		// Filter by price range
		if (minPrice) {
			filteredProducts = filteredProducts.filter(
				(p) => p.price >= Number.parseFloat(minPrice),
			);
		}
		if (maxPrice) {
			filteredProducts = filteredProducts.filter(
				(p) => p.price <= Number.parseFloat(maxPrice),
			);
		}

		// Search by name or description
		if (search) {
			const searchLower = search.toLowerCase();
			filteredProducts = filteredProducts.filter(
				(p) =>
					p.name.toLowerCase().includes(searchLower) ||
					p.description.toLowerCase().includes(searchLower),
			);
		}

		// Apply pagination
		const totalProducts = filteredProducts.length;
		const startIndex = offset ? Number.parseInt(offset) : 0;
		const endIndex = limit
			? startIndex + Number.parseInt(limit)
			: filteredProducts.length;
		const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

		res.json({
			success: true,
			data: paginatedProducts,
			pagination: {
				total: totalProducts,
				count: paginatedProducts.length,
				offset: startIndex,
				limit: limit ? Number.parseInt(limit) : null,
			},
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
});

// Get product by ID
app.get("/api/products/:id", (req, res) => {
	try {
		const productId = Number.parseInt(req.params.id);

		if (Number.isNaN(productId)) {
			return res.status(400).json({
				success: false,
				message: "Invalid product ID format",
			});
		}

		const product = products.find((p) => p.id === productId);

		if (!product) {
			return res.status(404).json({
				success: false,
				message: "Product not found",
			});
		}

		res.json({
			success: true,
			data: product,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
});

// Create new product
app.post("/api/products", (req, res) => {
	try {
		const { name, price, category, inStock = true, description } = req.body;

		// Validation
		if (!name || !price || !category) {
			return res.status(400).json({
				success: false,
				message: "Name, price, and category are required",
			});
		}

		const parsedPrice = Number.parseFloat(price);
		if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
			return res.status(400).json({
				success: false,
				message: "Price must be a valid positive number",
			});
		}

		const newProduct = {
			id: getNextId(products),
			name: name.trim(),
			price: parsedPrice,
			category: category.trim(),
			inStock: Boolean(inStock),
			description: description ? description.trim() : "",
			createdAt: new Date().toISOString(),
		};

		products.push(newProduct);

		res.status(201).json({
			success: true,
			data: newProduct,
			message: "Product created successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
});

// Update product
app.put("/api/products/:id", (req, res) => {
	try {
		const productId = Number.parseInt(req.params.id);

		if (Number.isNaN(productId)) {
			return res.status(400).json({
				success: false,
				message: "Invalid product ID format",
			});
		}

		const productIndex = products.findIndex((p) => p.id === productId);

		if (productIndex === -1) {
			return res.status(404).json({
				success: false,
				message: "Product not found",
			});
		}

		const { name, price, category, inStock, description } = req.body;

		// Validate price if provided
		if (price !== undefined) {
			const parsedPrice = Number.parseFloat(price);
			if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
				return res.status(400).json({
					success: false,
					message: "Price must be a valid positive number",
				});
			}
		}

		// Update product
		const updatedProduct = {
			...products[productIndex],
			...(name && { name: name.trim() }),
			...(price !== undefined && { price: Number.parseFloat(price) }),
			...(category && { category: category.trim() }),
			...(inStock !== undefined && { inStock: Boolean(inStock) }),
			...(description !== undefined && { description: description.trim() }),
			updatedAt: new Date().toISOString(),
		};

		products[productIndex] = updatedProduct;

		res.json({
			success: true,
			data: updatedProduct,
			message: "Product updated successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
});

// Delete product
app.delete("/api/products/:id", (req, res) => {
	try {
		const productId = Number.parseInt(req.params.id);

		if (Number.isNaN(productId)) {
			return res.status(400).json({
				success: false,
				message: "Invalid product ID format",
			});
		}

		const productIndex = products.findIndex((p) => p.id === productId);

		if (productIndex === -1) {
			return res.status(404).json({
				success: false,
				message: "Product not found",
			});
		}

		const deletedProduct = products[productIndex];
		products.splice(productIndex, 1);

		res.json({
			success: true,
			message: "Product deleted successfully",
			data: { id: deletedProduct.id, name: deletedProduct.name },
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		success: false,
		message: "Something went wrong!",
		error: process.env.NODE_ENV === "development" ? err.message : undefined,
	});
});

// 404 handler - must be last
app.use("*", (req, res) => {
	res.status(404).json({
		success: false,
		message: `Route ${req.method} ${req.originalUrl} not found`,
		availableEndpoints: [
			"GET /",
			"GET /health",
			"GET /api/users",
			"GET /api/users/:id",
			"POST /api/users",
			"PUT /api/users/:id",
			"DELETE /api/users/:id",
			"GET /api/products",
			"GET /api/products/:id",
			"POST /api/products",
			"PUT /api/products/:id",
			"DELETE /api/products/:id",
		],
	});
});

// Start server
app.listen(PORT, () => {
	console.log("🚀 AI Backend API Server Started");
	console.log(`📡 Server running on http://localhost:${PORT}`);
	console.log(`🏥 Health check: http://localhost:${PORT}/health`);
	console.log("📚 API Documentation: Check README.md and api-docs.md");
	console.log(`🌍 Environment: ${process.env.NODE_ENV || "development"}`);
	console.log("================================");
});

module.exports = app;