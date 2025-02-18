const { Model } = require("sequelize");

("use strict");

module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Example association
      Invoice.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      Invoice.belongsTo(models.Email, { foreignKey: "emailId", as: "email" });
    }
  }

  Invoice.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "User ID is required" },
          isInt: { msg: "User ID must be an integer" },
        },
      },
      emailId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "Email ID is required" },
          isInt: { msg: "Email ID must be an integer" },
        },
      },
      invoiceNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: { msg: "Invoice number is required" },
          notEmpty: { msg: "Invoice number cannot be empty" },
        },
      },
      issueDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Issue date is required" },
          isDate: { msg: "Issue date must be a date" },
        },
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Due date is required" },
          isDate: { msg: "Due date must be a date" },
        },
      },
      clientName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Client name is required" },
          notEmpty: { msg: "Client name cannot be empty" },
        },
      },
      totalAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          notNull: { msg: "Total amount is required" },
          isFloat: { msg: "Total amount must be a float" },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Status is required" },
          isIn: {
            args: [["pending", "paid", "cancelled"]],
            msg: "Status must be one of: pending, paid, cancelled",
          },
        },
      },
      pdfUrl: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: { msg: "PDF URL must be a valid URL" },
        },
      },
    },
    {
      sequelize,
      modelName: "Invoice",
      timestamps: true,
    }
  );

  return Invoice;
};
