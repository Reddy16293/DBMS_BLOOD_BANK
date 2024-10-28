const db = require('../config/db'); // Ensure this path is correct

// Admin Authorization Middleware
module.exports = async (req, res, next) => {
    try {
        // Check if userId is in the request body
        if (!req.body.userId) {
            return res.status(400).send({ success: false, message: "User ID not provided." });
        }

        // Query to fetch the user role from the database
        const [rows] = await db.execute('SELECT role FROM users WHERE id = ?', [req.body.userId]);

        // Check if the user exists
        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        const userRole = rows[0].role; // Assuming 'role' is the column name in your users table

        // Check if the user is an admin
        if (userRole !== "admin") {
            return res.status(403).send({
                success: false,
                message: "Access denied: Admins only",
            });
        }

        // If the user is an admin, proceed to the next middleware or route handler
        next(); 
    } catch (error) {
        console.error("Error in admin middleware:", error); // More informative logging
        return res.status(500).send({
            success: false,
            message: "Auth Failed, Admin API",
            error: error.message, // Include error message in response for debugging
        });
    }
};
