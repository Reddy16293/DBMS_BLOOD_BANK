const db = require('../database/db');

const Patient = {
    create: (name, email, phone, blood_type, age, gender, address, hospital_name, blood_needed, urgency_level, blood_request_date, callback) => {
        const sql = "INSERT INTO patients (name, email, phone, blood_type, age, gender, address, hospital_name, blood_needed, urgency_level, blood_request_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(sql, [name, email, phone, blood_type, age, gender, address, hospital_name, blood_needed, urgency_level, blood_request_date], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    findAll: (callback) => {
        const sql = "SELECT * FROM patients";
        db.query(sql, (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    findById: (id, callback) => {
        const sql = "SELECT * FROM patients WHERE id = ?";
        db.query(sql, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results[0]);
        });
    },

    updateRequestStatus: (id, status, callback) => {
        const sql = "UPDATE patients SET request_status = ? WHERE id = ?";
        db.query(sql, [status, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    },

    delete: (id, callback) => {
        const sql = "DELETE FROM patients WHERE id = ?";
        db.query(sql, [id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
};

module.exports = Patient;
