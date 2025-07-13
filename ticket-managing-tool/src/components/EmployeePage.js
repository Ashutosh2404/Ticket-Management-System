import React from "react";
import EmployeeTable from "./EmployeeTable";
import EmployeeTicketsBarChart from "./Charts/EmployeeTicketsBarChart";

const EmployeePage = () => {
  const [employeeStats, setEmployeeStats] = React.useState([]);

  React.useEffect(() => {
    fetch("http://localhost:5000/api/employee-ticket-stats")
      .then((res) => res.json())
      .then((data) => setEmployeeStats(data))
      .catch((err) => console.error("Failed to fetch employee stats:", err));
  }, []);

  return (
    <div className="p-4">
    <h2 className="text-2xl font-bold mb-6 text-blue-800">Employee Chart</h2>
      <EmployeeTicketsBarChart data={employeeStats} />
      <EmployeeTable />
    </div>
  );
};

export default EmployeePage;
