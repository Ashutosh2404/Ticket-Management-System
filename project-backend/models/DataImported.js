// models/DataImported.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const DataImported = sequelize.define("DataImported", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  ticketNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hoursWorked: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  hoursEstimated: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  employeeName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  uploadDate: {
  type: DataTypes.DATEONLY, 
  defaultValue: DataTypes.NOW,
  allowNull: false,
  }
}, {
  updatedAt: false,
  indexes: [
    {
      unique: true,
      fields: ["ticketNumber", "employeeName", "uploadDate"], 
    },
  ],
});

module.exports = DataImported;