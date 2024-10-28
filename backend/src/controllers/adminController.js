const userModel = require("../models/userModel");

// Get all donors data
const getDonarList = async (req, res) => {
  try {
    const donorData = await userModel.getByRole("donar"); // Use the appropriate method
    return res.status(200).send({
      success: true,
      message: "Donor data fetched successfully",
      donorData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in donor List API",
      error: error.message,
    });
  }
};

// Get all hospital data
const getHospitalList = async (req, res) => {
  try {
    const hospitalData = await userModel.getByRole("hospital"); // Use the appropriate method
    console.log(hospitalData);
    return res.status(200).send({
      success: true,
      message: "Hospital data fetched successfully",
      hospitalData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in hospital List API",
      error: error.message,
    });
  }
};

// Get all organization data
const getOrganisationList = async (req, res) => {
  try {
    const organizationData = await userModel.getByRole("organisation"); // Corrected spelling
    return res.status(200).send({
      success: true,
      message: "Organization data fetched successfully",
      organizationData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in organization List API",
      error: error.message,
    });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id; // Extract user ID from request params
    await userModel.findById(userId); // Check if user exists before deletion
    await userModel.delete(userId); // Use the delete method from userModel
    return res.status(200).send({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while deleting user",
      error: error.message,
    });
  }
};

module.exports = {
  getDonarList,
  getHospitalList,
  getOrganisationList,
  deleteUser,
};
