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
  const statusCounts = data.reduce((acc, ticket) => {
    const status = ticket.Status || "Unknown";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#a78bfa"],
      },
    ],
  };

  return (
    <div style={{ width: "300px", marginBottom: "30px" }}>
      <h3>Status Distribution</h3>
      <Pie data={chartData} />
    </div>
  );
}

export default StatusPieChart;
