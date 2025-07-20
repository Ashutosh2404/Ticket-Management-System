import React, { useState } from "react";
import MLComparisonChart from "./Charts/MlComparisonChart";
import axios from "axios";

function EstimationPage() {
  const [inputValue, setInputValue] = useState("");
  const [ticketData, setTicketData] = useState(null);
  const [ticketDetails, setTicketDetails] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGetEstimation = async () => {
    if (!inputValue) return;
    setLoading(true);
    setError("");
    setTicketData(null);
    setTicketDetails(null);
    try {
      // Fetch ML comparison data
      const response = await axios.post("http://localhost:5000/api/ticket-comparison", { ticketNumber: inputValue });
      setTicketData(response.data);

      // Fetch ticket details from ticket table
      const ticketRes = await axios.get(`http://localhost:5000/api/tickets/${inputValue}`);
      setTicketDetails(ticketRes.data);
    } catch (err) {
      setError("Ticket not found or server error.");
    }
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Estimate</h2>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Enter Ticket/Employee Number"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          className="border p-2 rounded w-64"
        />
      </div>

      <div className="flex justify-center mb-4">
        <button
          onClick={handleGetEstimation}
          className="bg-transparent text-stone-700 border border-blue-500 hover:bg-green-400 hover:text-white font-bold py-2 px-4 rounded-full"
          disabled={loading || !inputValue}
        >
          {loading ? "Loading..." : "Get it !!"}
        </button>
      </div>

      {error && <div className="text-center text-red-500 mb-4">{error}</div>}

      {ticketData && (
        <>
          <MLComparisonChart
            humanHours={ticketData.humanEstimatedHours}
            machineHours={ticketData.machinePredictedHours}
          />
          {ticketDetails && (
            <div className="max-w-xl mx-auto mb-6 p-4 border rounded shadow bg-white">
              <h3 className="text-lg font-semibold mb-2">Ticket Details</h3>
              <p><strong>Ticket Number:</strong> {ticketDetails.ticketNumber}</p>
              <p><strong>Description:</strong> {ticketDetails.description}</p>
              <p><strong>Category:</strong> {ticketDetails.category}</p>
              <p><strong>Status:</strong> {ticketDetails.status}</p>
              <p><strong>Priority:</strong> {ticketDetails.priority}</p>
              <p><strong>Hours Estimated:</strong> {ticketDetails.hoursEstimated}</p>
              <p><strong>Hours Worked:</strong> {ticketDetails.hoursWorked}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default EstimationPage;
