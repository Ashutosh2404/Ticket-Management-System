import React from "react";
import { Bar } from "react-chartjs-2";

function EmployeeTicketsBarChart({ data }) {
  if (!Array.isArray(data)) {
    console.error("Invalid data passed to EmployeeTicketsBarChart:", data);
    return <div>Failed to load employee ticket data</div>;
  }

  // Only include employees with open tickets > 0
  const openTicketsData = data.filter(emp => emp.openTickets && emp.openTickets > 0);

  const chartData = {
    labels: openTicketsData.map(emp => emp.employeeName),
    datasets: [
      {
        label: "Open Tickets",
        data: openTicketsData.map(emp => emp.openTickets),
        backgroundColor: "#c07d31ff",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { 
        position: "top",
        labels: {
          font: { size: 18 },
          color: "#2d3748"
        }
      },
      title: { 
        display: true, 
        text: "Number of Tickets vs Employees",
        font: { size: 10 },
        color: "#c07d31ff"
      },
    },
    scales: {
      x: { 
        title: { 
          display: true, 
          text: "Employees",
          font: { size: 18 },
          color: "#c07d31ff"
        },
        ticks: {
          font: { size: 14 },
          color: "#2d3748"
        }
      },
      y: { 
        title: { 
          display: true, 
          text: "Tickets Assigned",
          font: { size: 18 },
          color: "#c07d31ff"
        },
        beginAtZero: true,
        ticks: {
          font: { size: 14 },
          color: "#2d3748"
        }
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <Bar data={chartData} options={options} />
    </div>
  );
};


export default EmployeeTicketsBarChart;
