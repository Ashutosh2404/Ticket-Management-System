import React, { useEffect, useState } from "react";
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

function WorkloadChart() {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetch("http://localhost:5000/api/employee-workload")
      .then(res => res.json())
      .then(data => {
        const labels = data.map(d => d.name);
        const values = data.map(d => d.hoursWorked);

        setChartData({
          labels,
          datasets: [
            {
              label: "Total Hours Worked",
              data: values,
              backgroundColor: [
                "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#14b8a6"
              ],
            },
          ],
        });
      })
      .catch(err => console.error("Failed to load chart data", err));
  }, []);

  return (
    <div style={{ width: "600px", marginBottom: "30px" }}>
      <h3>Employee Workload</h3>
      <Bar data={chartData} options={{ indexAxis: "y" }} />
    </div>
  );
}

export default WorkloadChart;
