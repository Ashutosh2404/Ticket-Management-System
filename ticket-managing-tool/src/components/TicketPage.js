import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import TicketTable from "./TicketTable";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function TicketPage() {
  const [tickets, setTickets] = useState([]);
  const query = useQuery();
  const navigate = useNavigate();
  const statusFilter = query.get("status"); // 'open', 'closed', or null

  useEffect(() => {
    axios.get("http://localhost:5000/api/tickets")
      .then((res) => setTickets(res.data))
      .catch((err) => console.error("Error fetching tickets:", err));
  }, []);

  const filteredTickets = statusFilter
    ? tickets.filter(
        (ticket) =>
          ticket.status &&
          ticket.status.toLowerCase() === statusFilter.toLowerCase()
      )
    : tickets;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Tickets</h1>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => navigate("/tickets")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          All
        </button>
        <button
          onClick={() => navigate("/tickets?status=open")}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Open
        </button>
        <button
          onClick={() => navigate("/tickets?status=closed")}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Closed
        </button>
      </div>

      <TicketTable data={filteredTickets} />
    </div>
  );
}

export default TicketPage;
