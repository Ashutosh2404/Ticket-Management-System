// WorkloadChart.js
import React from "react";
import { Bar } from "react-chartjs-2";

function WorkloadChart({ data }) {
  const hoursByEmployee = data.reduce((acc, ticket) => {
    const name = ticket["Employee Name"] || "Unknown";
    acc[name] = (acc[name] || 0) + Number(ticket["Hours worked"] || 0);
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(hoursByEmployee),
    datasets: [
      {
        label: "Total Hours Worked",
        data: Object.values(hoursByEmployee),
        backgroundColor: [
          "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#14b8a6",
        ],
      },
    ],
  };

  return (
    <div style={{ width: "600px", marginBottom: "30px" }}>
      <h3>Employee Workload</h3>
      <Bar data={chartData} options={{ indexAxis: "y" }} />
    </div>
  );
}

export default WorkloadChart;
