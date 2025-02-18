const authService = require("../services/auth.service");

const register = async (req, res) => {
  const { fullName, email, password, role } = req.body;
  try {
    const user = await authService.registerUser(
      fullName,
      email,
      password,
      role
    );
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { token, user } = await authService.loginUser(email, password);
    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  register,
  login,
};
