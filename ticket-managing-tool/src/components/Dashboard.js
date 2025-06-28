import React, { useEffect, useState } from "react";
import SummaryCards from "./SummaryCards";
import StatusPieChart from "./Charts/StatusPieChart";
import CategoryBarChart from "./Charts/CategoryBarChart";
import EffortComparisonChart from "./Charts/EffortComparisonChart";
import WorkloadChart from "./Charts/WorkloadChart";
import TicketTable from "./TicketTable";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/data")
      .then(res => res.json())
      .then(json => setData(json.data || []))
      .catch(err => console.error("Error loading data:", err));
  }, []);

  return (
    <div>
      <SummaryCards data={data} />
      <div className="charts-container">
        <StatusPieChart data={data} />
        <CategoryBarChart data={data} />
        <EffortComparisonChart data={data} />
        <WorkloadChart data={data} />
      </div>
      <TicketTable data={data} />
    </div>
  );
}

export default Dashboard;
