import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:5000/api/employee-workload")
      .then((res) => {
        const data = res.data;
        if (!Array.isArray(data)) {
          console.error("Invalid data:", data);
          setError("Failed to load chart data");
          return;
        }
        const labels = data.map((d) => d.name);
        const values = data.map((d) => d.hoursWorked);
        setChartData({
          labels,
          datasets: [
            {
              label: "Total Hours Worked",
              data: values,
              backgroundColor: ["#3b82f6", "#10b981", "#f59e0b", "#ef4444"],
            },
          ],
        });
      })
      .catch((err) => {
        console.error("Failed to load chart data", err);
        setError("Failed to load workload data");
      });
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!chartData) return <div>Loading chart...</div>;

  return (
    <div style={{ width: "600px", marginBottom: "30px" }}>
      <h3>Employee Workload</h3>
      <Bar data={chartData} options={{ indexAxis: "y" }} />
    </div>
  );
}

export default WorkloadChart;
