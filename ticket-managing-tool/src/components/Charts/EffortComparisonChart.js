import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function EffortComparisonChart({ data }) {
  if (!Array.isArray(data)) {
    console.error("Invalid data passed to EffortComparisonChart:", data);
    return <div>Failed to load effort comparison data</div>;
  }

  const labels = data.map(ticket => ticket.ticketNumber);
  const estimated = data.map(ticket => Number(ticket.hoursEstimated || 0));
  const actual = data.map(ticket => Number(ticket.hoursWorked || 0));

  const chartData = {
    labels,
    datasets: [
      {
        label: "Estimated Hours",
        data: estimated,
        backgroundColor: "rgba(255, 206, 86, 0.6)", // yellow
      },
      {
        label: "Actual Hours Worked",
        data: actual,
        backgroundColor: "rgba(54, 162, 235, 0.6)", // blue
      },
    ],
  };

  return (
    <div style={{ width: "700px", marginBottom: "30px" }}>
      <h3>Estimated vs Actual Hours</h3>
      <Bar data={chartData} />
    </div>
  );
}


export default EffortComparisonChart;
