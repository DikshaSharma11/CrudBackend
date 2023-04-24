const express = require("express");
const { body, param, query } = require("express-validator");
const {
  addUser,
  editUser,
  deleteUser,
  getAllUsers,
  getUsersByJoinDate,
} = require("../controllers/userController");

const router = express.Router();

// Add a user
router.post(
  "/users",
  body("name").isString(),
  body("age").isNumeric(),
  body("email").isEmail(),
  body("phoneNumber").isMobilePhone(),
  body("joindate").isISO8601(),
  addUser
);

// Edit a user
router.put(
  '/users/:id',
  param('emailOrPhoneNumber').isString(), // Add this line
  body('name').optional().isString().notEmpty(),
  body('age').optional().isNumeric(),
  body('email').optional().isEmail().normalizeEmail(),
  body('phoneNumber').optional().isMobilePhone(),
  editUser
);


// Delete a user
router.delete("/users/:emailOrPhoneNumber", deleteUser);

// Get all users
router.get("/users", getAllUsers);

// Get users by join date
router.get(
  "/users/joindate",
  query("order").optional().isIn(["asc", "desc"]),
  getUsersByJoinDate
);

module.exports = router;
