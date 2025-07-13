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
      <div className="flex flex-wrap gap-6 charts-container">
        <div className="flex-1 min-w-[300px]">
          <StatusPieChart data={tickets} />
        </div>
        <div className="flex-1 min-w-[300px]">
          <CategoryBarChart data={tickets} />
        </div>
      </div>
      <EffortComparisonChart data={tickets} />
      <WorkloadChart />
      <TicketTable data={tickets} />
    </div>
  );
}

export default Dashboard;
