import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="bg-zinc-800 w-full top-0 z-50">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/32" // Placeholder for logo
            alt="Logo"
            className="h-8 w-8"
          />
          <span className="text-xl font-bold tracking-wide text-white">
            Resource Manager
          </span>
        </div>
        {/* Center: Menu */}
        <div className="flex space-x-6">
          <button
            onClick={() => navigate("/")}
            className="text-white hover:text-slate-200 font-medium bg-transparent border-none cursor-pointer"
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate("/employees")}
            className="text-white hover:text-slate-200 font-medium bg-transparent border-none cursor-pointer"
          >
            Employee
          </button>
          <button
            onClick={() => navigate("/tickets")}
            className="text-white hover:text-slate-200 font-medium bg-transparent border-none cursor-pointer"
          >
            Tickets
          </button>
        </div>
        {/* Right: User Icon */}
        <div>
          <FaUserCircle className="text-2xl text-white hover:text-yellow-300 cursor-pointer" />
        </div>
      </div>
    </nav>
  );
}