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
    <div className="w-full p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-8">
      <div className="flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-between">
        <Card title="Total Tickets" value={totalTickets} />
        <Card title="Open Tickets" value={openTickets} />
        <Card title="Closed Tickets" value={closedTickets} />
        <Card title="Avg Resolution Time" value={`${avgResolutionTime} h`} />
        <Card title="Avg Estimation Error" value={`${avgAccuracy} h`} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="min-w-[160px] max-w-[250px] p-4 sm:p-5 bg-white bg-opacity-90 border border-gray-300 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
      <h4 className="mb-2 text-sm sm:text-base font-semibold text-gray-700">{title}</h4>
      <div className="text-xl sm:text-2xl font-bold text-gray-800">{value}</div>
    </div>
  );
}

export default SummaryCards;
