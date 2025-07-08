import React from "react";

function SummaryCards({ data }) {
  const totalTickets = data.length;

  // Match correct field: `status`
  const openTickets = data.filter(ticket => ticket.status === "Open").length;
  const closedTickets = data.filter(ticket => ticket.status === "Closed").length;

  // Match correct field: `hoursWorked`
  const avgResolutionTime =
    totalTickets > 0
      ? (
          data.reduce((sum, ticket) => sum + Number(ticket.hoursWorked || 0), 0) / totalTickets
        ).toFixed(1)
      : "0.0";

  // Match correct fields: `hoursEstimated` & `hoursWorked`
  const avgAccuracy =
    totalTickets > 0
      ? (
          data.reduce((sum, ticket) => {
            const estimated = Number(ticket.hoursEstimated || 0);
            const actual = Number(ticket.hoursWorked || 0);
            return sum + Math.abs(estimated - actual);
          }, 0) / totalTickets
        ).toFixed(1)
      : "0.0";

  return (
    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "20px" }}>
      <Card title="Total Tickets" value={totalTickets} />
      <Card title="Open Tickets" value={openTickets} />
      <Card title="Closed Tickets" value={closedTickets} />
      <Card title="Avg Resolution Time" value={`${avgResolutionTime} h`} />
      <Card title="Avg Estimation Error" value={`${avgAccuracy} h`} />
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        width: "200px",
        backgroundColor: "#f3f4f6",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h4 style={{ marginBottom: "10px", fontSize: "16px", color: "#333" }}>{title}</h4>
      <div style={{ fontSize: "24px", fontWeight: "bold", color: "#1f2937" }}>{value}</div>
    </div>
  );
}

export default SummaryCards;
