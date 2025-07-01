const express = require("express");
const cors = require("cors");

const sequelize = require("./database");
const Ticket = require("./models/Ticket");
const Employee = require("./models/Employee");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Test DB connection (optional)
sequelize.authenticate()
  .then(() => console.log("✅ Connected to MySQL database"))
  .catch((err) => console.error("❌ Failed to connect to DB:", err));

// API: Fetch all tickets
app.get("/api/tickets", async (req, res) => {
  try {
    const tickets = await Ticket.findAll();
    res.json(tickets);
  } catch (err) {
    console.error("Error fetching tickets:", err);
    res.status(500).json({ message: "Failed to fetch tickets" });
  }
});

// API: Fetch all employees with stats
app.get("/api/employees", async (req, res) => {
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

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
