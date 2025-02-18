const { Invoice } = require("../models");
const { User } = require("../models");

const createInvoice = async (
  userId,
  emailId,
  invoiceNumber,
  issueDate,
  dueDate,
  clientName,
  totalAmount
) => {
  try {
    return await Invoice.create({
      userId,
      emailId,
      invoiceNumber,
      issueDate,
      dueDate,
      clientName,
      totalAmount,
    });
  } catch (error) {
    throw new Error(`Invoice creation failed: ${error.message}`);
  }
};

const getInvoices = async (userId) => {
  try {
    return await Invoice.findAll({
      where: { userId },
      include: [{ model: User, as: "user" }],
    });
  } catch (error) {
    throw new Error(`Failed to fetch invoices: ${error.message}`);
  }
};

const getInvoiceById = async (invoiceId) => {
  try {
    return await Invoice.findByPk(invoiceId, {
      include: [{ model: User, as: "user" }],
    });
  } catch (error) {
    throw new Error(`Failed to fetch invoice: ${error.message}`);
  }
};

const updateInvoice = async (invoiceId, data) => {
  try {
    const invoice = await Invoice.findByPk(invoiceId);
    if (!invoice) {
      throw new Error("Invoice not found");
    }

    return await invoice.update(data);
  } catch (error) {
    throw new Error(`Invoice update failed: ${error.message}`);
  }
};

const deleteInvoice = async (invoiceId) => {
  try {
    const invoice = await Invoice.findByPk(invoiceId);
    if (!invoice) {
      throw new Error("Invoice not found");
    }

    return await invoice.destroy();
  } catch (error) {
    throw new Error(`Invoice deletion failed: ${error.message}`);
  }
};

const getInvoiceByNumber = async (invoiceNumber) => {
  try {
    return await Invoice.findOne({ where: { invoiceNumber } });
  } catch (error) {
    throw new Error(`Failed to fetch invoice: ${error.message}`);
  }
};

module.exports = {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
  getInvoiceByNumber,
};
