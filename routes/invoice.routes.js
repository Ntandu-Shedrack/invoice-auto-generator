const express = require("express");
const router = express.Router();
const invoiceController = require("../controllers/invoice.controller");
const authenticateUser = require("../middlewares/auth.middleware");

// Create a new invoice
router.post("/", authenticateUser, invoiceController.createInvoice);

// Get all invoices for a specific user
router.get("/user/:userId", authenticateUser, invoiceController.getInvoices);

// Get a specific invoice by ID
router.get("/:invoiceId", authenticateUser, invoiceController.getInvoiceById);

// Update an invoice
router.put("/:invoiceId", authenticateUser, invoiceController.updateInvoice);

// Delete an invoice
router.delete("/:invoiceId", authenticateUser, invoiceController.deleteInvoice);

module.exports = router;
