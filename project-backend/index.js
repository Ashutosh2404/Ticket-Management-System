// index.js
const sequelize = require("./database");
const Employee = require("./models/Employee");
const Ticket = require("./models/Ticket");
const DataImported = require("./models/DataImported");
const PredictedEstimate = require("./models/PredictedEstimate");

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ All models synced successfully.");
  } catch (err) {
    console.error("❌ Failed to sync models:", err);
  } finally {
    await sequelize.close();
  }
})();
