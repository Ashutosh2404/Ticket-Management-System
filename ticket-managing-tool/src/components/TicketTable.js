import React from "react";

function TicketTable({ data = [] }) {
  if (!data || data.length === 0) {
    return <div className="mt-6 text-center text-gray-500">No tickets found.</div>;
  }

  const columns = Object.keys(data[0]);

  return (
    <div className="overflow-x-auto mt-8">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">All Tickets</h3>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-4 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50`}
            >
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-2 text-sm text-gray-600"
                >
                  {row[col] !== null && row[col] !== undefined ? row[col] : "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TicketTable;
