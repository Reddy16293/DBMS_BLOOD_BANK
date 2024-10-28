const db = require("../config/db"); // Ensure this path is correct
const userModel = require("../models/userModel");

// CREATE INVENTORY
const createInventoryController = async (req, res) => {
    try {
        const { email, inventoryType, bloodGroup, quantity } = req.body;

        // Validation - Check if user exists
        const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (user.length === 0) {
            throw new Error("User Not Found. Please enter a valid email address.");
        }

        const organisationId = req.body.userId;

        // Check inventory quantity if inventoryType is 'out'
        if (inventoryType === "out") {
            // Calculate total in blood quantity
            const [totalInResults] = await db.query(
                "SELECT SUM(quantity) AS total FROM inventory WHERE organisation = ? AND inventoryType = 'in' AND bloodGroup = ?",
                [organisationId, bloodGroup]
            );
            const totalIn = totalInResults[0]?.total || 0;

            // Calculate total out blood quantity
            const [totalOutResults] = await db.query(
                "SELECT SUM(quantity) AS total FROM inventory WHERE organisation = ? AND inventoryType = 'out' AND bloodGroup = ?",
                [organisationId, bloodGroup]
            );
            const totalOut = totalOutResults[0]?.total || 0;

            // Calculate available quantity
            const availableQuantity = totalIn - totalOut;

            // Validate requested quantity
            if (availableQuantity < quantity) {
                return res.status(500).send({
                    success: false,
                    message: `Only ${availableQuantity} ML of ${bloodGroup.toUpperCase()} is available.`,
                });
            }

            req.body.hospital = user[0]?.id; // Assuming user.id is the hospital ID
        } else if (inventoryType === "in") {
            req.body.donar = user[0]?.id; // Assuming user.id is the donor ID
        }

        // Save the record
        const sql = "INSERT INTO inventory (inventoryType, bloodGroup, quantity, email, organisation, hospital, donar) VALUES (?, ?, ?, ?, ?, ?, ?)";
        await db.query(sql, [inventoryType, bloodGroup, quantity, email, organisationId, req.body.hospital || null, req.body.donar || null]);

        return res.status(201).send({
            success: true,
            message: "New Record Created successfully",
        });
    } catch (error) {
        console.error("Error in create inventory:", error);
        return res.status(500).send({
            success: false,
            message: error.message,
            error,
        });
    }
};

// GET ALL Out BLOOD RECORDS
const getInventoryHospitalController = async (req, res) => {
    try {
        const filters = req.body.filters || {};
        const sql = "SELECT * FROM inventory WHERE ? ORDER BY createdAt DESC";
        const [inventory] = await db.query(sql, [filters]);
        return res.status(200).send({
            success: true,
            message: "Get hospitals' consumers records successfully.",
            inventory,
        });
    } catch (error) {
        console.error("Error in getting hospital inventory:", error);
        return res.status(500).send({
            success: false,
            message: "Error in getting consumer inventory.",
            error,
        });
    }
};

// GET ALL BLOOD RECORDS
const getInventoryController = async (req, res) => {
    try {
        const organisationId = req.body.userId;
        const sql = "SELECT * FROM inventory WHERE organisation = ? ORDER BY createdAt DESC";
        const [inventory] = await db.query(sql, [organisationId]);
        return res.status(200).send({
            success: true,
            message: "Get all records successfully.",
            inventory,
        });
    } catch (error) {
        console.error("Error in getting all inventory:", error);
        return res.status(500).send({
            success: false,
            message: "Error in getting all inventory.",
            error,
        });
    }
};

// GET RECENT BLOOD RECORDS
const getRecentInventoryController = async (req, res) => {
    try {
        const organisationId = req.body.userId;
        const sql = "SELECT * FROM inventory WHERE organisation = ? ORDER BY createdAt DESC LIMIT 3";
        const [inventory] = await db.query(sql, [organisationId]);
        return res.status(200).send({
            success: true,
            message: "Recent Inventory Data",
            inventory,
        });
    } catch (error) {
        console.error("Error in getting recent inventory:", error);
        return res.status(500).send({
            success: false,
            message: "Error in recent inventory API.",
            error,
        });
    }
};

// GET DONOR RECORDS
const getDonarsController = async (req, res) => {
    try {
        const organisationId = req.body.userId;
        const sql = "SELECT DISTINCT donar FROM inventory WHERE organisation = ?";
        const [donarIds] = await db.query(sql, [organisationId]);
        const donars = await userModel.find({ id: donarIds.map(d => d.donar) }); // Adjust the userModel query based on your implementation
        return res.status(200).send({
            success: true,
            message: "Donor Record Fetched Successfully",
            donars,
        });
    } catch (error) {
        console.error("Error in fetching donor records:", error);
        return res.status(500).send({
            success: false,
            message: "Error in donor records.",
            error,
        });
    }
};

// GET HOSPITAL RECORDS
const getHospitalsController = async (req, res) => {
    try {
        const organisationId = req.body.userId;
        const sql = "SELECT DISTINCT hospital FROM inventory WHERE organisation = ?";
        const [hospitalIds] = await db.query(sql, [organisationId]);
        const hospitals = await userModel.find({ id: hospitalIds.map(h => h.hospital) }); // Adjust the userModel query based on your implementation
        return res.status(200).send({
            success: true,
            message: "Hospital Record Fetched Successfully",
            hospitals,
        });
    } catch (error) {
        console.error("Error in fetching hospital records:", error);
        return res.status(500).send({
            success: false,
            message: "Error in hospital records.",
            error,
        });
    }
};

// GET ORGANIZATION RECORDS
const getOrganisationController = async (req, res) => {
    try {
        const donarId = req.body.userId;
        const sql = "SELECT DISTINCT organisation FROM inventory WHERE donar = ?";
        const [organisationIds] = await db.query(sql, [donarId]);
        const organisations = await userModel.find({ id: organisationIds.map(o => o.organisation) }); // Adjust the userModel query based on your implementation
        return res.status(200).send({
            success: true,
            message: "Organisation Record Fetched Successfully",
            organisations,
        });
    } catch (error) {
        console.error("Error in fetching organisation records:", error);
        return res.status(500).send({
            success: false,
            message: "Error in organisation records.",
            error,
        });
    }
};

// GET ORGANISATION FOR HOSPITAL RECORDS
const getOrganisationForHospitalController = async (req, res) => {
    try {
        const hospitalId = req.body.userId;
        const sql = "SELECT DISTINCT organisation FROM inventory WHERE hospital = ?";
        const [organisationIds] = await db.query(sql, [hospitalId]);
        const organisations = await userModel.find({ id: organisationIds.map(o => o.organisation) }); // Adjust the userModel query based on your implementation
        return res.status(200).send({
            success: true,
            message: "Organisation Record for hospital Fetched Successfully",
            organisations,
        });
    } catch (error) {
        console.error("Error in fetching organisation records for hospital:", error);
        return res.status(500).send({
            success: false,
            message: "Error in organisation records.",
            error,
        });
    }
};

module.exports = {
    createInventoryController,
    getInventoryController,
    getDonarsController,
    getHospitalsController,
    getOrganisationController,
    getOrganisationForHospitalController,
    getInventoryHospitalController,
    getRecentInventoryController,
};
