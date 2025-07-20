// models/PredictedEstimate.js
const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const PredictedEstimate = sequelize.define('PredictedEstimate', {
  ticketNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  employeeName: DataTypes.STRING,
  category: DataTypes.STRING,
  priority: DataTypes.STRING,
  description: DataTypes.TEXT,
  predictedHours: DataTypes.FLOAT,
  predictionDate: DataTypes.DATE
});

module.exports = PredictedEstimate;
