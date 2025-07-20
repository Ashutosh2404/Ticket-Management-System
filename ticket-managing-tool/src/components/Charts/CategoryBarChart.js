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
  if (!Array.isArray(data)) {
    console.error("Invalid data passed to CategoryBarChart:", data);
    return <div>Failed to load category data</div>;
  }

  const categoryCounts = data.reduce((acc, d) => {
    acc[d.category] = (acc[d.category] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: "Tickets",
        data: Object.values(categoryCounts),
        backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
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
