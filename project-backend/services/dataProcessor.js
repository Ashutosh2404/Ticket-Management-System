// services/dataProcessor.js
const DataImported = require("../models/DataImported");
const updateHoursFromImportedData = require("../utils/updateHours");

async function validateAndInsertRows(jsonData) {
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

    // Validate required fields
    if (
      !employeeName || !date || !ticketNumber || !description || !category ||
      hoursWorked == null || hoursEstimated == null || !status || !priority
    ) {
      throw new Error(`❌ Upload aborted. Row ${i + 2} has missing fields.`);
    }

    // Insert into DataImported table
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

  console.log("✅ Data imported into DataImported.");
  await updateHoursFromImportedData();
}

module.exports = validateAndInsertRows;
