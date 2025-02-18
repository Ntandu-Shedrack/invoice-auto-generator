const express = require("express");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("../config/database");
const authRoutes = require("../routes/auth.routes");
const invoiceRoutes = require("../routes/invoice.routes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/invoices", invoiceRoutes);

// Database connection and server start
sequelize
  .sync()
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
