
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/employee-ticket-stats')
      .then(res => setEmployees(res.data))
      .catch(err => console.error('Failed to fetch employee stats:', err));
  }, []);

  // Filter employees by name
  const filteredEmployees = filter
    ? employees.filter(emp => emp.employeeName.toLowerCase().includes(filter.toLowerCase()))
    : employees;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Employee Overview</h2>
      <div className="mb-4 flex items-center gap-2">
        <input
          type="text"
          placeholder="Filter by name..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-64"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead className="bg-blue-100">
            <tr>
              <th className="border px-4 py-2 text-left">Employee Name</th>
              <th className="border px-4 py-2 text-left">Tickets Assigned</th>
              <th className="border px-4 py-2 text-left">Open Tickets</th>
              <th className="border px-4 py-2 text-left">Closed Tickets</th>
              <th className="border px-4 py-2 text-left">Total Hours Worked</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(emp => (
              <tr key={emp.employeeName} className="hover:bg-blue-50">
                <td className="border px-4 py-2">{emp.employeeName}</td>
                <td className="border px-4 py-2">{emp.ticketsAssigned}</td>
                <td className="border px-4 py-2">{emp.openTickets}</td>
                <td className="border px-4 py-2">{emp.closedTickets}</td>
                <td className="border px-4 py-2">{Number(emp.totalHours).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeTable;
