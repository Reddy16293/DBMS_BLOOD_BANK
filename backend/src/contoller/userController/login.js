const Admin = require('../../models/Admin');
const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const { email, password } = req.body;

    // Authenticate the admin
    Admin.authenticate(email, password, (err, admin) => {
        if (err) {
            return res.status(500).json({ error: "Error during login" });
        }
        if (!admin) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(200).json({ 
            message: "Login successful", 
            token: token, 
            admin: { id: admin.id, name: admin.name, email: admin.email } 
        });
    });
};

module.exports = login;