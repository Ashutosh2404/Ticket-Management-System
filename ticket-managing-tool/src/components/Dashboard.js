import React, { useEffect, useState } from "react";
import SummaryCards from "./SummaryCards";
import StatusPieChart from "./Charts/StatusPieChart";
import CategoryBarChart from "./Charts/CategoryBarChart";
import EffortComparisonChart from "./Charts/EffortComparisonChart";
import WorkloadChart from "./Charts/WorkloadChart";
import TicketTable from "./TicketTable";

function Dashboard() {
  const [tickets, setTickets] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch tickets
    fetch("http://localhost:5000/api/tickets")
      .then(res => res.json())
      .then(json => setTickets(json || [])) // ✅ fix response shape
      .catch(err => console.error("Error loading tickets:", err));

    // Fetch employees
    fetch("http://localhost:5000/api/employees")
      .then(res => res.json())
      .then(json => setEmployees(json || []))
      .catch(err => console.error("Error loading employees:", err));
  }, []);

  return (
    <div>
      <SummaryCards data={tickets} />
      <div className="charts-container">
        <StatusPieChart data={tickets} />
        <CategoryBarChart data={tickets} />
        <EffortComparisonChart data={tickets} />
        <WorkloadChart data={employees} /> {/* ✅ Now uses API-backed employee data */}
      </div>
      <TicketTable data={tickets} />
    </div>
  );
}

export default Dashboard;
