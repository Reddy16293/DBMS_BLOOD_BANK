const express = require('express');
const app = express();
const db = require('./database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRoutes = require('./Routes/userRoutes');
require('dotenv').config();

app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Change the port to 3000
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
