import React from "react";
import "./App.css";
import "tailwindcss/tailwind.css";
import Dashboard from "./components/Dashboard";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    
    <div className="App">
      <Navbar />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">Ticket & Effort Dashboard</h1>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
