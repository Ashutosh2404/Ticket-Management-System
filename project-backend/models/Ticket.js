const { DataTypes } = require("sequelize");
const sequelize = require("../database"); 

const Ticket = sequelize.define("Ticket", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ticketNumber: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  description: DataTypes.TEXT,
  category: DataTypes.STRING,
  status: DataTypes.STRING,
  priority: DataTypes.STRING,
  hoursWorked: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  hoursEstimated: DataTypes.FLOAT,
}, {
  timestamps: true,
});

module.exports = Ticket;
