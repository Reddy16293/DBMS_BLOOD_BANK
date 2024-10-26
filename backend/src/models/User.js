const db = require('../database/db');
const bcrypt = require('bcrypt');

const User = {
    create: (username, email, password, role, callback) => {
        // Hash the password before storing it
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return callback(err);
            }

            const sql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
            db.query(sql, [username, email, hashedPassword, role], (err, results) => {
                if (err) {
                    return callback(err);
                }
                callback(null, results);
            });
        });
    },

    findByEmail: (email, callback) => {
        const sql = "SELECT * FROM users WHERE email = ?";
        db.query(sql, [email], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]); // return the first user found
        });
    },

    findById: (id, callback) => {
        const sql = "SELECT * FROM users WHERE id = ?";
        db.query(sql, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]); // return the user found
        });
    },

    authenticate: (email, password, callback) => {
        // Find user by email
        User.findByEmail(email, (err, user) => {
            if (err) {
                return callback(err);
            }

            if (!user) {
                return callback(null, false); // User not found
            }

            // Compare the provided password with the hashed password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    return callback(err);
                }

                if (!isMatch) {
                    return callback(null, false); // Password doesn't match
                }

                callback(null, user); // Authentication successful
            });
        });
    }

    // Additional queries can go here as needed
};

module.exports = User;
