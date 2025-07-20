import React, { useEffect, useState } from "react";
import axios from "axios";
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
    axios.get("http://localhost:5000/api/tickets")
      .then(res => setTickets(res.data || []))
      .catch(err => console.error("Error loading tickets:", err));

    // Fetch employees
    axios.get("http://localhost:5000/api/employees")
      .then(res => setEmployees(res.data || []))
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
      
    </div>
  );
}

export default Dashboard;
