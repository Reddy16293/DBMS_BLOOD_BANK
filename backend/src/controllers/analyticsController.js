const db = require("../config/db"); // Ensure this path is correct
const bloodGroups = ["O+", "O-", "AB+", "AB-", "A+", "A-", "B+", "B-"]; // Define blood groups

// GET BLOOD DATA
const bloodGroupDetailController = async (req, res) => {
  try {
      const organisation = req.body.userId; // Assuming userId is the organisation ID
      const bloodGroupData = [];

      // Create a single query to get total in and out for all blood groups
      const query = `
          SELECT 
              bloodGroup, 
              SUM(CASE WHEN inventoryType = 'in' THEN quantity ELSE 0 END) AS totalIn, 
              SUM(CASE WHEN inventoryType = 'out' THEN quantity ELSE 0 END) AS totalOut
          FROM 
              inventory 
          WHERE 
              organisation = ? AND bloodGroup IN (?)
          GROUP BY 
              bloodGroup
      `;

      // Execute the query
      const [results] = await db.query(query, [organisation, bloodGroups]);

      // Calculate available blood for each blood group
      results.forEach(result => {
          const availableBlood = result.totalIn - result.totalOut;

          // Push the data to the bloodGroupData array
          bloodGroupData.push({
              bloodGroup: result.bloodGroup,
              totalIn: result.totalIn || 0,
              totalOut: result.totalOut || 0,
              availableBlood,
          });
      });

      return res.status(200).send({
          success: true,
          message: "Blood Group Data fetched successfully",
          bloodGroupData,
      });
  } catch (error) {
      console.error("Error in blood group data analytics:", error); // Log the error for debugging
      return res.status(500).send({
          success: false,
          message: "Error in blood group data analytics",
      });
  }
};


module.exports = { bloodGroupDetailController };
