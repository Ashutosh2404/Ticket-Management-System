const DataImported = require("../models/DataImported");
const Employee = require("../models/Employee");
const Ticket = require("../models/Ticket");

async function updateHoursFromImportedData() {
  try {
    const importedData = await DataImported.findAll();

    const employeeHoursMap = {};
    const ticketSet = new Set();

    for (const row of importedData) {
      const {
        employeeName,
        ticketNumber,
        description,
        category,
        status,
        priority,
        hoursWorked,
        hoursEstimated
      } = row;

      // === Update employee hours ===
      if (!employeeHoursMap[employeeName]) {
        employeeHoursMap[employeeName] = 0;
      }
      employeeHoursMap[employeeName] += parseFloat(hoursWorked);

      // === Create or update ticket table (only once per ticket) ===
      if (!ticketSet.has(ticketNumber)) {
        await Ticket.findOrCreate({
          where: { ticketNumber },
          defaults: {
            description,
            category,
            status,
            priority,
            hoursWorked,
            hoursEstimated,
          },
        });
        ticketSet.add(ticketNumber);
      }
    }

    // === Insert or update employees ===
    for (const [name, totalHours] of Object.entries(employeeHoursMap)) {
      await Employee.findOrCreate({
        where: { name },
        defaults: {
          totalHours,
        },
      }).then(async ([emp, created]) => {
        if (!created) {
          emp.totalHours += totalHours;
          await emp.save();
        }
      });
    }

    console.log("✅ Employee and Ticket tables updated.");
  } catch (err) {
    console.error("❌ Error updating hours:", err);
  }
}

module.exports = updateHoursFromImportedData;
