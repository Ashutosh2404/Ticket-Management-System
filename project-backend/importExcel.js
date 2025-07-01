const xlsx = require("xlsx");
const path = require("path");
const sequelize = require("./database");
const DataImported = require("./models/DataImported");
const updateHoursFromImportedData = require("./utils/updateHours");

async function importExcel() {
  try {
    await sequelize.sync(); // Ensure DB is synced
    console.log("✅ Database synced.");

    const filePath = path.join(__dirname, "data", "Ticket_Data.xlsx");
    const workbook = xlsx.readFile(filePath);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    // Clean & validate data
    for (let [i, row] of jsonData.entries()) {
      const {
        "Employee Name": employeeName,
        "Date": date,
        "Ticket Number": ticketNumber,
        "Ticket short desc": description,
        "Ticket category": category,
        "Hours Worked": hoursWorked,
        "Hours Estimated": hoursEstimated,
        "Status": status,
        "Priority": priority,
      } = row;

      if (
        !employeeName || !date || !ticketNumber || !description || !category ||
        hoursWorked == null || hoursEstimated == null || !status || !priority
      ) {
        throw new Error(`❌ Upload aborted. Row ${i + 2} has missing fields.`);
      }

      await DataImported.create({
        employeeName,
        date,
        ticketNumber,
        description,
        category,
        hoursWorked,
        hoursEstimated,
        status,
        priority,
        uploadDate: new Date(),
      });
    }

    console.log("✅ Excel data imported into DataImported.");

    // ✅ Only after data is uploaded, update tickets and employees
    await updateHoursFromImportedData();
  } catch (error) {
    console.error("❌ Error importing Excel data:", error.message || error);
  }
}

importExcel();
