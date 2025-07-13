import { useNavigate } from 'react-router-dom';

function SummaryCards({ data }) {
  const navigate = useNavigate();
  const totalTickets = data.length;
  const openTickets = data.filter(ticket => ticket.status === 'Open').length;
  const closedTickets = data.filter(ticket => ticket.status === 'Closed').length;

  const avgResolutionTime = totalTickets > 0
    ? (data.reduce((sum, t) => sum + Number(t.hoursWorked || 0), 0) / totalTickets).toFixed(1)
    : '0.0';

  const avgAccuracy = totalTickets > 0
    ? (data.reduce((sum, t) => sum + Math.abs(Number(t.hoursEstimated || 0) - Number(t.hoursWorked || 0)), 0) / totalTickets).toFixed(1)
    : '0.0';

  return (
    <div className="w-full flex gap-6 flex-wrap mb-6 justify-center md:justify-between">
      <Card title="Total Tickets" value={totalTickets} onClick={() => navigate('/tickets')} />
      <Card title="Open Tickets" value={openTickets} onClick={() => navigate('/tickets?status=Open')} />
      <Card title="Closed Tickets" value={closedTickets} onClick={() => navigate('/tickets?status=Closed')} />
      <Card title="Avg Resolution Time" value={`${avgResolutionTime} h`} />
      <Card title="Avg Estimation Error" value={`${avgAccuracy} h`} />
    </div>
  );
}

function Card({ title, value, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`flex-1 min-w-[180px] max-w-[250px] bg-gradient-to-r from-blue-100 to-purple-100 border border-gray-300 rounded-xl shadow p-5 flex flex-col items-center justify-center cursor-${onClick ? 'pointer' : 'default'} hover:scale-105 transition`}
    >
      <h4 className="mb-2 text-base font-semibold text-gray-700">{title}</h4>
      <div className="text-2xl font-bold text-gray-800">{value}</div>
    </div>
  );
}

export default SummaryCards;