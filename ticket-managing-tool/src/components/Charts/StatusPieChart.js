import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function StatusPieChart({ data }) {
  if (!Array.isArray(data)) {
    console.error("Invalid data passed to StatusPieChart:", data);
    return <div>Failed to load status data</div>;
  }

  const statusCounts = data.reduce((acc, d) => {
    acc[d.status] = (acc[d.status] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        label: "Ticket Status",
        data: Object.values(statusCounts),
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
      },
    ],
  };

  return (
    <div style={{ width: "400px", marginBottom: "30px" }}>
      <h3>Ticket Status</h3>
      <Pie data={chartData} />
    </div>
  );
}

export default StatusPieChart;
