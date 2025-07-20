// mlPredictor.js

const axios = require('axios');
const sequelize = require('./database');
const DataImported = require('./models/DataImported');
const PredictedEstimate = require('./models/PredictedEstimate');

async function getEstimatedResolutionTime(ticketData) {
  try {
    const response = await axios.post('http://localhost:5001/predict', ticketData);
    return response.data.estimated_hours;
  } catch (error) {
    console.error(`❌ ML API error for ticket ${ticketData.ticketNumber}:`, error.message);
    return null;
  }
}

async function runMLPredictions() {
  try {
    await sequelize.sync(); // ensure DB is connected
    const tickets = await DataImported.findAll();

    for (const ticket of tickets) {
      const existingPrediction = await PredictedEstimate.findOne({
        where: { ticketNumber: ticket.ticketNumber },
      });

      if (existingPrediction) {
        console.log(`ℹ️ Prediction already exists for ticket ${ticket.ticketNumber}, skipping.`);
        continue;
      }

      const estimated_hours = await getEstimatedResolutionTime({
        ticketNumber: ticket.ticketNumber,
        category: ticket.category,
        priority: ticket.priority,
        employee: ticket.employeeName,
        description: ticket.description,
      });

      const predictedHoursValue = estimated_hours !== null ? estimated_hours : 0;

      await PredictedEstimate.create({
        ticketNumber: ticket.ticketNumber,
        employeeName: ticket.employeeName,
        category: ticket.category,
        priority: ticket.priority,
        description: ticket.description,
        predictedHours: predictedHoursValue,
        predictionDate: new Date(),
      });

      console.log(`✅ Saved ML prediction for ticket ${ticket.ticketNumber}: ${predictedHoursValue} hours`);
    }

    console.log('✅ All predictions completed.');
  } catch (error) {
    console.error('❌ Error in ML predictor script:', error.message);
  } finally {
    await sequelize.close();
    console.log('🔌 Database connection closed.');
  }
}

runMLPredictions();
