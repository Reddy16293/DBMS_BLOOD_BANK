const jwt = require("jsonwebtoken");
const db = require('../config/db'); // MySQL connection

// Authentication Middleware
module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            return res.status(401).send({ success: false, message: "No token provided." });
        }

        const token = authHeader
        if (!token) {
            return res.status(401).send({ success: false, message: "No token provided." });
        }

        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
                if (error) return reject(error);
                resolve(decoded);
            });
        });

        req.body.userId = decoded.userId; // Attach userId to request body for later use
        next(); // Call the next middleware or route handler
    } catch (error) {
        console.log(error);
        return res.status(401).send({ success: false, message: "Auth Failed" });
    }
};
