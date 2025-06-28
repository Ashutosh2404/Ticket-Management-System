import React from "react";

function TicketTable({ data }) {
  if (data.length === 0) return null;

  const columns = Object.keys(data[0]);

  return (
    <div style={{ overflowX: "auto", marginTop: "30px" }}>
      <h3>All Tickets</h3>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  background: "#f3f4f6",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    backgroundColor: "#fff",
                  }}
                >
                  {row[col]}
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
