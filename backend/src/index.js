const express = require('express');
const app = express();
const db = require('./config/db'); // MySQL database connection
const cors = require('cors');
require('dotenv').config(); // Load environment variables

const PORT = process.env.PORT || 5001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON requests
// CORS settings
const corsOptions = {
    origin: 'http://localhost:5173', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // Allow credentials (cookie/session)
    allowedHeaders: ['Content-Type', 'Authorization', 'x-token'],
  };
// Test route
app.use('/api/v1/test', require('./routes/testRouts'));

// Authentication routes
app.use('/api/v1/auth', require('./routes/authRoutes'));

// Inventory routes
app.use('/api/v1/inventory', require('./routes/inventoryRoutes'));

// Analytics routes
app.use('/api/v1/analytics', require('./routes/analyticsRoutes'));

// Admin routes
app.use('/api/v1/admin', require('./routes/adminRoutes'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // You can optionally verify the connection here
    db.connect((err) => {
        if (err) {
            console.error('Error connecting to the database:', err);
            process.exit(1); // Exit process with failure
        } else {
            console.log('Connected to MySQL database');
        }
    });
});
