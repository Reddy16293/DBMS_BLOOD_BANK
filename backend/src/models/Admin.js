const db = require('../database/db');
const bcrypt = require('bcrypt');

const Admin = {
    create: (name, email, password, callback) => {
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
                return callback(err);
            }

            const sql = "INSERT INTO admins (name, email, password) VALUES (?, ?, ?)";
            db.query(sql, [name, email, hashedPassword], (err, results) => {
                if (err) {
                    return callback(err);
                }
                callback(null, results);
            });
        });
    },

    authenticate: (email, password, callback) => {
        const sql = "SELECT * FROM admins WHERE email = ?";
        db.query(sql, [email], (err, results) => {
            if (err) {
                return callback(err);
            }

            const admin = results[0];
            if (!admin) {
                return callback(null, false);
            }

            bcrypt.compare(password, admin.password, (err, isMatch) => {
                if (err) {
                    return callback(err);
                }

                if (!isMatch) {
                    return callback(null, false);
                }

                callback(null, admin);
            });
        });
    }
};

module.exports = Admin;

