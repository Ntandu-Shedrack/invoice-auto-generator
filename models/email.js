const { Model } = require("sequelize");

("use strict");

module.exports = (sequelize, DataTypes) => {
  class Email extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations here
      // Example: Email.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }

  Email.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: "User ID is required" },
          isInt: { msg: "User ID must be an integer" },
        },
      },
      sender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Sender is required" },
          isEmail: { msg: "Sender must be a valid email address" },
        },
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "Subject is required" },
          len: {
            args: [1, 255],
            msg: "Subject must be between 1 and 255 characters",
          },
        },
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      receivedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notNull: { msg: "Received date is required" },
          isDate: { msg: "Received date must be a valid date" },
        },
      },
      hasAttachment: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Email",
      tableName: "emails",
      timestamps: true, // Adds createdAt and updatedAt fields
      underscored: true, // Uses snake_case for automatically added fields
    }
  );

  Email.associate = function (models) {
    Email.belongsTo(models.User, {
      foreignKey: "UserId",
      as: "User",
    });
  };

  return Email;
};
