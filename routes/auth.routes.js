const express = require("express");
const { register, login } = require("../controllers/auth.controller");

const router = express.Router();

// Route for user registration
router.post("/register", async (req, res, next) => {
  try {
    await register(req, res);
  } catch (error) {
    next(error);
  }
});

// Route for user login
router.post("/login", async (req, res, next) => {
  try {
    await login(req, res);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
