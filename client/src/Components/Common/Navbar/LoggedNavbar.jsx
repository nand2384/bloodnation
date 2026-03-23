import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { UserCircle, LogOut, Droplet } from "lucide-react";

function LoggedNavbar() {
  const navigate = useNavigate();
  const [profileDivStatus, setProfileDivStatus] = useState(false);
  const dropdownRef = useRef(null);

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDivStatus(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed w-full top-4 z-50 px-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto glass-panel rounded-2xl px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className='bg-red-50 p-2 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-sm border border-red-100'>
              <Droplet className='w-5 h-5 text-red-600' />
            </div>
            <span className='text-xl font-bold text-slate-900 tracking-widest uppercase'>
              Blood Nation
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden lg:flex items-center gap-8 font-semibold text-slate-600">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition duration-200 hover:text-slate-900 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:-bottom-[6px] after:left-0 after:bg-red-500 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                  isActive ? "text-slate-900 after:scale-x-100 after:origin-bottom-left" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/bloodAvailability"
              className={({ isActive }) =>
                `transition duration-200 hover:text-slate-900 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:-bottom-[6px] after:left-0 after:bg-red-500 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                  isActive ? "text-slate-900 after:scale-x-100 after:origin-bottom-left" : ""
                }`
              }
            >
              Find Blood
            </NavLink>
          </div>

          <div className="flex items-center relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileDivStatus((prev) => !prev)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-slate-100 cursor-pointer transition duration-200 border border-transparent hover:border-slate-200"
            >
              <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center border border-slate-200 shadow-sm">
                <UserCircle className="w-5 h-5 text-slate-600" />
              </div>
              <span className="hidden md:block font-bold text-slate-700 mr-2">Account</span>
            </button>

            {/* Dropdown menu */}
            <div
              className={`absolute top-14 right-0 w-56 glass-panel rounded-xl py-2 z-50 transition-all duration-300 origin-top-right ${
                profileDivStatus
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-95 pointer-events-none -translate-y-2"
              }`}
            >
              <div className="px-4 py-3 border-b border-slate-100">
                <p className="text-sm font-bold text-slate-900 tracking-wide truncate">Logged in User</p>
                <p className="text-xs text-slate-500 truncate mt-0.5">Manage your account</p>
              </div>
              <div className="py-2">
                <Link
                  to="/profile"
                  onClick={() => setProfileDivStatus(false)}
                  className="block px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                  View Profile
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2.5 w-full text-left text-sm text-red-600 hover:bg-red-50 hover:cursor-pointer font-bold transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default LoggedNavbar;
