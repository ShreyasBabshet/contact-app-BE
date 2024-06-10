const express = require("express");
const http = require("http");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, getCurrentUser);

module.exports = router;
