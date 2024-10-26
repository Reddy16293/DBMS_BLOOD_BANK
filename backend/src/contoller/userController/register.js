const Admin = require('../../models/Admin');

// Admin Registration Controller
const register = (req, res) => {
    const { name, email, password } = req.body;

    // Create a new admin
    Admin.create(name, email, password, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error creating admin" });
        }
        res.status(201).json({ message: "Admin created successfully", adminId: results.insertId });
    });
};
module.exports = register;
