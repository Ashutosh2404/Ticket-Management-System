// models/Employee.js
const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Employee = sequelize.define("Employee", {
  employeeId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true, 
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
  },
  totalHours: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  }
}, {
  timestamps: true,
});

module.exports = Employee;
