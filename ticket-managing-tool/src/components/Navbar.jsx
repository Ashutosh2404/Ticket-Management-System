import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function Navbar({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      onLogout();
      navigate("/login");
    }
  };

  return (
    <nav className="bg-zinc-800 w-full top-0 z-50">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left: Logo and App Name */}
        <div className="flex items-center space-x-2">
          <img
            src="https://via.placeholder.com/32"
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
          <button
            onClick={() => navigate("/estimation")}
            className="text-white hover:text-slate-200 font-medium bg-transparent border-none cursor-pointer"
          >
            Estimation
          </button>
        </div>

        {/* Right: User Icon + Logout */}
        <div className="flex items-center space-x-4">
          <FaUserCircle className="text-2xl text-white" />
          <button
            onClick={handleLogout}
            className="text-sm text-white bg-red-500 px-2 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
