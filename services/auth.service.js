const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS);

const registerUser = async (fullName, email, password, role) => {
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    return await User.create({
      fullName,
      email,
      password: hashedPassword,
      role,
    });
  } catch (error) {
    throw new Error(`Registration failed: ${error.message}`);
  }
};

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("User Does Not Exist");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return { token, user };
  } catch (error) {
    throw new Error(`Login failed: ${error.message}`);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
