const fs = require("fs");
const path = require("path");
const sequelize = require("./database");
const validateAndInsertRows = require("./services/dataProcessor");
const updateHoursFromImportedData = require("./utils/updateHours");

async function importJson() {
  try {
    await sequelize.sync();
    console.log("✅ Database synced.");

    const filePath = path.join(__dirname, "data", "Ticket_Data.json");
    const rawData = fs.readFileSync(filePath, "utf8");
    const jsonData = JSON.parse(rawData);

    await validateAndInsertRows(jsonData);
    console.log("✅ JSON data imported into DataImported.");

    await updateHoursFromImportedData();
  } catch (error) {
    console.error("❌ Error importing JSON data:", error.message || error);
  }
}

module.exports = importJson;