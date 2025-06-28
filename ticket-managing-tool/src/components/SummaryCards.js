import React from "react";

function SummaryCards({ data }) {
  const totalTickets = data.length;

  const openTickets = data.filter(ticket => ticket.Status === "Open").length;
  const closedTickets = data.filter(ticket => ticket.Status === "Closed").length;

  const avgResolutionTime =
    (data.reduce((sum, ticket) => sum + Number(ticket["Hours worked"] || 0), 0) / totalTickets).toFixed(1);

  const avgAccuracy =
    (
      data.reduce((sum, ticket) => {
        const estimated = Number(ticket["Hours estimated"] || 0);
        const actual = Number(ticket["Hours worked"] || 0);
        return sum + Math.abs(estimated - actual);
      }, 0) / totalTickets
    ).toFixed(1);

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
