const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Ensure the correct import path for your user model

// Register Controller
const registerController = async (req, res) => {
  try {
      const { email, password, role, name, organisationName, hospitalName, address, phone, bloodGroup } = req.body;

      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
          return res.status(409).send({
              success: false,
              message: "User already exists",
          });
      }

      // Create new user
      const userId = await User.create({
          role,
          name,
          organisationName,
          hospitalName,
          email,
          password,
          address,
          phone,
          bloodGroup // Include bloodGroup here
      });

      return res.status(201).send({
          success: true,
          message: "User registered successfully",
          userId,
      });
  } catch (error) {
      console.error("Error in register API:", error);
      return res.status(500).send({
          success: false,
          message: "Error in register API",
          error: error.message, // Return only the error message
      });
  }
};


// Login Controller
const loginController = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Authenticate user
        const user = await User.authenticate(email, password);
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Check if role matches
        if (user.role !== role) {
            return res.status(403).send({
                success: false,
                message: "Unauthorized access: role doesn't match",
            });
        }

        // Generate JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        return res.status(200).send({
            success: true,
            message: "Login successful",
            token,
            user,
        });
    } catch (error) {
        console.error("Error in login API:", error);
        return res.status(500).send({
            success: false,
            message: "Error in login API",
            error: error.message,
        });
    }
};

// Get Current User
const currentUserController = async (req, res) => {
    try {
        const userId = req.body.userId;

        // Fetch user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).send({
            success: true,
            message: "User fetched successfully",
            user,
        });
    } catch (error) {
        console.error("Error in getting current user:", error);
        return res.status(500).send({
            success: false,
            message: "Unable to fetch current user",
            error: error.message, // Return only the error message
        });
    }
};

module.exports = { registerController, loginController, currentUserController };
