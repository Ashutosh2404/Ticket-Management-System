import React from "react";
import { Bar } from "react-chartjs-2";

function MLComparisonChart({ humanHours, machineHours }) {
  if (typeof humanHours !== "number" || typeof machineHours !== "number") {
    console.error("Invalid props passed to MLComparisonChart");
    return <div>Failed to load ML comparison data</div>;
  }

  const data = {
    labels: ["Human Estimate", "Machine Estimate"],
    datasets: [
      {
        label: "Hours",
        data: [humanHours, machineHours],
        backgroundColor: ["#3b82f6", "#10b981"],
      },
    ],
  };

  return (
    <div style={{ width: "400px", marginBottom: "30px" }}>
      <h3>ML vs Human Estimate</h3>
      <Bar data={data} />
    </div>
  );
}

export default MLComparisonChart;
