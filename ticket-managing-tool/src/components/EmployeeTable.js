import React, { useEffect, useState } from 'react';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/employees') // Adjust endpoint as needed
      .then(res => res.json())
      .then(data => setEmployees(data))
      .catch(err => console.error('Failed to fetch employee data:', err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Employee Overview</h2>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Employee ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Open Tickets</th>
            <th className="border px-4 py-2">Closed Tickets</th>
            <th className="border px-4 py-2">Total Hours Worked</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp.id}>
              <td className="border px-4 py-2">{emp.id}</td>
              <td className="border px-4 py-2">{emp.name}</td>
              <td className="border px-4 py-2">{emp.openTickets || 0}</td>
              <td className="border px-4 py-2">{emp.closedTickets || 0}</td>
              <td className="border px-4 py-2">{emp.totalHours || 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
