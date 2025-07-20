const express = require('express');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./database');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/authMiddleware');

const Ticket = require('./models/Ticket');
const Employee = require('./models/Employee');
const DataImported = require('./models/DataImported');
const PredictedEstimate = require('./models/PredictedEstimate');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);

// Test DB connection (optional)
sequelize.authenticate()
  .then(() => console.log("✅ Connected to MySQL database"))
  .catch((err) => console.error("❌ Failed to connect to DB:", err));

// API: Fetch all tickets
app.get("/api/tickets", authMiddleware, async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.json(tickets);
  } catch (err) {
    console.error("Error fetching tickets:", err);
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
});

// API: Fetch a single ticket by ticketNumber
app.get("/api/tickets/:ticketNumber", authMiddleware, async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ where: { ticketNumber: req.params.ticketNumber } });
    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// API: Fetch all employees for the Employee workload chart
app.get("/api/employee-workload", authMiddleware, async (req, res) => {
  try {
    const data = await DataImported.findAll();

    const workload = {};

    for (const row of data) {
      const name = row.employeeName || "Unknown";
      const hours = parseFloat(row.hoursWorked) || 0;

      if (!workload[name]) {
        workload[name] = 0;
      }
      workload[name] += hours;
    }

    const response = Object.keys(workload).map(name => ({
      name,
      hoursWorked: workload[name],
    }));

    res.json(response);
  } catch (err) {
    console.error("Error fetching employee workload:", err);
    res.status(500).json({ message: "Failed to fetch workload" });
  }
});

// API: Fetch all employees with stats
app.get("/api/employees", authMiddleware, async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    const employees = await Employee.findAll();

    const employeeMap = {};

    for (const emp of employees) {
      employeeMap[emp.name] = {
        employeeId: emp.employeeId,
        name: emp.name,
        totalHours: emp.totalHours || 0,
        openTickets: 0,
        closedTickets: 0,
      };
    }

    for (const t of tickets) {
      const name = t.employeeName;
      if (employeeMap[name]) {
        if ((t.status || "").toLowerCase().includes("open")) {
          employeeMap[name].openTickets += 1;
        } else if ((t.status || "").toLowerCase().includes("closed")) {
          employeeMap[name].closedTickets += 1;
        }
      }
    }

    res.json(Object.values(employeeMap));
  } catch (err) {
    console.error("Error fetching employee data:", err);
    res.status(500).json({ message: "Failed to fetch employees" });
  }
});

// API: Fetch employee ticket stats from DataImported
app.get("/api/employee-ticket-stats", authMiddleware, async (req, res) => {
  try {
    const data = await DataImported.findAll();
    const employeeStats = {};

    for (const row of data) {
      const name = row.employeeName || "Unknown";
      if (!employeeStats[name]) {
        employeeStats[name] = {
          employeeName: name,
          ticketsAssigned: 0,
          openTickets: 0,
          closedTickets: 0,
          totalHours: 0,
        };
      }
      employeeStats[name].ticketsAssigned += 1;
      employeeStats[name].totalHours += parseFloat(row.hoursWorked) || 0;
      if ((row.status || "").toLowerCase() === "open") {
        employeeStats[name].openTickets += 1;
      } else if ((row.status || "").toLowerCase() === "closed") {
        employeeStats[name].closedTickets += 1;
      }
    }

    res.json(Object.values(employeeStats));
  } catch (err) {
    console.error("Error fetching employee ticket stats:", err);
    res.status(500).json({ message: "Failed to fetch employee ticket stats" });
  }
});

app.post('/api/ticket-comparison', authMiddleware, async (req, res) => {
  const { ticketNumber } = req.body;

  if (!ticketNumber) {
    return res.status(400).json({ message: 'Ticket number is required' });
  }

  try {
    const human = await DataImported.findOne({ where: { ticketNumber } });
    const machine = await PredictedEstimate.findOne({ where: { ticketNumber } });

    if (!human || !machine) {
      return res.status(404).json({ message: 'Ticket data not found.' });
    }

    const pastRecords = await DataImported.findAll({
      where: { employeeName: human.employeeName },
      attributes: ['employeeName', 'uploadDate', 'hoursWorked'],
    });

    const humanHours = parseFloat(human.hoursEstimated);
    const machineHours = parseFloat(machine.predictedHours);
    const deviation = Math.abs(humanHours - machineHours);
    const percentDeviation = humanHours
      ? ((deviation / humanHours) * 100).toFixed(2)
      : '0';

    res.json({
      ticketNumber,
      employeeName: human.employeeName,
      category: human.category,
      priority: human.priority,
      description: human.description,
      humanEstimatedHours: humanHours,
      machinePredictedHours: machineHours,
      deviation,
      percentDeviation,
      pastRecords: pastRecords.map((rec) => ({
        employeeName: rec.employeeName,
        uploadDate: rec.uploadDate,
        hoursWorked: rec.hoursWorked,
      })),
    });
  } catch (err) {
    console.error('❌ Error in ticket-comparison API:', err.message);
    res.status(500).json({ message: 'Server error fetching ticket comparison' });
  }
});



// Sync User model

sequelize.sync().then(() => {
  app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
});