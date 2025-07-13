import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const EmployeeTicketsBarChart = ({ data }) => {
  const chartData = {
    labels: data.map(emp => emp.employeeName),
    datasets: [
      {
        label: "Tickets Assigned",
        data: data.map(emp => emp.ticketsAssigned),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Number of Tickets vs Employees" },
    },
    scales: {
      x: { title: { display: true, text: "Employee" } },
      y: { title: { display: true, text: "Tickets Assigned" }, beginAtZero: true },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default EmployeeTicketsBarChart;
