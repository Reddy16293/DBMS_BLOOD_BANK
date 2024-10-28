const db = require('../config/db'); // Adjust the path as needed
const bcrypt = require('bcryptjs'); // Use bcryptjs

const User = {
    // Create a new user
    create: async (userData) => {
      const { role, name, organisationName, hospitalName, email, password, address, phone, bloodGroup } = userData; // Add bloodGroup to destructured properties

      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      const sql = `
          INSERT INTO users (role, name, organisationName, hospitalName, email, password, address, phone, bloodGroup)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      return new Promise((resolve, reject) => {
          db.query(sql, [role, name, organisationName, hospitalName, email, hashedPassword, address, phone, bloodGroup], (err, results) => {  // Add bloodGroup to the values array
              if (err) {
                  return reject(err);
              }
              resolve(results.insertId); // Return the newly created user ID
          });
      });
  },
    // Find user by email
    findByEmail: async (email) => {
        const sql = "SELECT * FROM users WHERE email = ?";
        return new Promise((resolve, reject) => {
            db.query(sql, [email], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]); // return the first user found
            });
        });
    },

    // Find user by ID
    findById: async (id) => {
        const sql = "SELECT * FROM users WHERE id = ?";
        return new Promise((resolve, reject) => {
            db.query(sql, [id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]); // return the user found
            });
        });
    },

    // Authenticate user
    authenticate: async (email, password) => {
        // Find user by email
        const user = await User.findByEmail(email);
        if (!user) {
            return null; // User not found
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        return isMatch ? user : null; // Return user if authenticated, otherwise null
    },

    // Get users by role
    getByRole: async (role) => {
        const sql = "SELECT * FROM users WHERE role = ?";
        return new Promise((resolve, reject) => {
            db.query(sql, [role], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results); // Return users with the specified role
            });
        });
    },
  
    // Delete user by ID
    delete: async (userId) => {
        const sql = "DELETE FROM users WHERE id = ?";
        return new Promise((resolve, reject) => {
            db.query(sql, [userId], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results); // Return the result of the deletion
            });
        });
    }
};

module.exports = User;
