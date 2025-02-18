const InvoiceService = require("../services/invoice.service");

const createInvoice = async (req, res) => {
  try {
    const newInvoice = await InvoiceService.createInvoice(req.body);
    return res.status(201).json(newInvoice);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getInvoices = async (req, res) => {
  try {
    const { userId } = req.params;
    const invoices = await InvoiceService.getInvoicesByUser(userId);
    return res.status(200).json(invoices);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getInvoiceById = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const invoice = await InvoiceService.getInvoiceById(invoiceId);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    return res.status(200).json(invoice);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const updateInvoice = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const updatedInvoice = await InvoiceService.updateInvoice(
      invoiceId,
      req.body
    );
    if (!updatedInvoice)
      return res.status(404).json({ message: "Invoice not found" });

    return res.status(200).json(updatedInvoice);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteInvoice = async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const deleted = await InvoiceService.deleteInvoice(invoiceId);
    if (!deleted) return res.status(404).json({ message: "Invoice not found" });

    return res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
};
