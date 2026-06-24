import { Link, NavLink, useNavigate } from "react-router-dom";
import { WalletCards } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `rounded-xl px-3 py-2 text-sm font-medium ${isActive ? "bg-indigo-50 text-indigo-700" : "text-slate-600 hover:bg-slate-100"}`;

  return (
    <nav className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 font-bold text-slate-900">
          <span className="rounded-2xl bg-indigo-600 p-2 text-white"><WalletCards size={20} /></span>
          SpendWise
        </Link>
        {user && (
          <div className="flex items-center gap-2">
            <NavLink to="/" className={linkClass}>Dashboard</NavLink>
            <NavLink to="/add" className={linkClass}>Add</NavLink>
            <NavLink to="/reports" className={linkClass}>Reports</NavLink>
            <button onClick={handleLogout} className="rounded-xl px-3 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-50">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
