import { FaUserCircle } from "react-icons/fa";

export function Navbar() {
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
          <a
            href="#dashboard"
            className="text-white hover:text-slate-200 font-medium"
          >
            Dashboard
          </a>
          <a
            href="#employees"
            className="text-white hover:text-slate-200 font-medium"
          >
            Employee
          </a>
          <a
            href="#tickets"
            className="text-white hover:text-slate-200 font-medium"
          >
            Tickets
          </a>
        </div>
        {/* Right: User Icon */}
        <div>
          <FaUserCircle className="text-2xl text-white hover:text-yellow-300 cursor-pointer" />
        </div>
      </div>
    </nav>
  );
}