import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import TicketPage from "./components/TicketPage";
import EmployeePage from "./components/EmployeePage";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tickets" element={<TicketPage />} />
          <Route path="/employees" element={<EmployeePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
