const xlsx = require("xlsx");
const path = require("path");
const sequelize = require("./database");
const validateAndInsertRows = require("./services/dataProcessor");
const updateHoursFromImportedData = require("./utils/updateHours");

async function importExcel() {
  try {
    await sequelize.sync();
    console.log("✅ Database synced.");

    const filePath = path.join(__dirname, "data", "Ticket_Data.xlsx");
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    await validateAndInsertRows(jsonData);
    console.log("✅ Excel data imported into DataImported.");

    await updateHoursFromImportedData();
  } catch (error) {
    console.error("❌ Error importing Excel data:", error.message || error);
  }
}

module.exports = importExcel;