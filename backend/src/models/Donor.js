const db = require('../database/db');

const Donor = {
    create: (name, email, phone, blood_type, age, gender, address, medical_conditions, last_donation_date, callback) => {
        const sql = "INSERT INTO donors (name, email, phone, blood_type, age, gender, address, medical_conditions, last_donation_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(sql, [name, email, phone, blood_type, age, gender, address, medical_conditions, last_donation_date], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    findAll: (callback) => {
        const sql = "SELECT * FROM donors";
        db.query(sql, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    findById: (id, callback) => {
        const sql = "SELECT * FROM donors WHERE id = ?";
        db.query(sql, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    updateLastDonation: (id, last_donation_date, callback) => {
        const sql = "UPDATE donors SET last_donation_date = ? WHERE id = ?";
        db.query(sql, [last_donation_date, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const sql = "DELETE FROM donors WHERE id = ?";
        db.query(sql, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
};

module.exports = Donor;
