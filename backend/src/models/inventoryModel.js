const db = require('../config/db'); // Adjust the path as needed

const Inventory = {
    // Create a new inventory record
    create: async (inventoryData) => {
        const { inventoryType, bloodGroup, quantity, email, organisation, hospital, donar } = inventoryData;

        const sql = `
            INSERT INTO inventory (inventoryType, bloodGroup, quantity, email, organisation, hospital, donar)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        // Use the promise-based query
        const [results] = await db.query(sql, [inventoryType, bloodGroup, quantity, email, organisation, hospital || null, donar || null]);
        return results.insertId; // Return the newly created inventory record ID
    },

    // Fetch all inventory records
    getAll: async () => {
        const sql = "SELECT * FROM inventory";

        // Use the promise-based query
        const [results] = await db.query(sql);
        return results; // Return all inventory records
    },

    // Fetch inventory by blood group
    getByBloodGroup: async (bloodGroup) => {
        const sql = "SELECT * FROM inventory WHERE bloodGroup = ?";

        // Use the promise-based query
        const [results] = await db.query(sql, [bloodGroup]);
        return results; // Return inventory records for the specific blood group
    }
};

module.exports = Inventory;
