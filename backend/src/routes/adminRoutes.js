const express = require("express");
const {
  getDonarList,
  getHospitalList,
  getOrganisationList,
  deleteUser,
} = require("../controllers/adminController");
const adminMiddelware = require("../middlewares/adminMiddelware");
const authMiddelware = require("../middlewares/authMiddelware");

const router = express.Router();

// Admin routes
router.get("/donar-list", authMiddelware,  getDonarList);
router.get("/hospital-list", authMiddelware, getHospitalList);
router.get(
  "/organisation-list",
  authMiddelware,
  adminMiddelware,
  getOrganisationList
);

// =================== Delete ==================================================
// delete donar
router.delete("/delete-user/:id", authMiddelware, adminMiddelware, deleteUser);

module.exports = router;
