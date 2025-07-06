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

function CategoryBarChart({ data }) {
  const categories = data.reduce((acc, ticket) => {
    const category = ticket["Ticket category"] || "Others";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(categories),
    datasets: [
      {
        label: "Tickets by Category",
        data: Object.values(categories),
        backgroundColor: ["#60a5fa", "#34d399", "#fbbf24", "#f87171", "#a5b4fc"],
      },
    ],
  };

  return (
    <div style={{ width: "500px", marginBottom: "30px" }}>
      <h3>Ticket Categories</h3>
      <Bar data={chartData} />
    </div>
  );
}

export default CategoryBarChart;
