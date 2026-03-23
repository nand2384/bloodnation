import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Shield, Users, Building2, Activity, PlusCircle } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <div
        className={`${
          isOpen ? "w-72" : "w-0"
        } glass-panel border-r border-y-0 border-l-0 border-white/10 text-white transition-all duration-300 h-full relative z-20 flex flex-col`}
      >
        <div className="p-6 text-xl font-black tracking-tight border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <Shield className="w-6 h-6 text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
          </div>
          <span className="bg-gradient-to-r from-red-500 to-rose-400 bg-clip-text text-transparent drop-shadow-sm">Admin Panel</span>
        </div>
        <nav className="flex flex-col gap-2 p-4 flex-grow">
          <NavLink
            to="/panel/users"
            className={({ isActive }) =>
              `${
                isActive ? "bg-red-500/20 border-red-500/30 text-rose-100 shadow-[0_0_10px_rgba(239,68,68,0.1)]" : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
              } p-4 rounded-xl border transition-all font-bold flex items-center gap-3`
            }
          >
            <Users className="w-5 h-5" />
            Users
          </NavLink>
          <NavLink
            to="/panel/bloodbanks"
            className={({ isActive }) =>
              `${
                isActive ? "bg-red-500/20 border-red-500/30 text-rose-100 shadow-[0_0_10px_rgba(239,68,68,0.1)]" : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
              } p-4 rounded-xl border transition-all font-bold flex items-center gap-3`
            }
          >
            <Building2 className="w-5 h-5" />
            Blood Banks
          </NavLink>
          <NavLink
            to="/panel/stock"
            className={({ isActive }) =>
              `${
                isActive ? "bg-red-500/20 border-red-500/30 text-rose-100 shadow-[0_0_10px_rgba(239,68,68,0.1)]" : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
              } p-4 rounded-xl border transition-all font-bold flex items-center gap-3`
            }
          >
            <Activity className="w-5 h-5" />
            Availability Data
          </NavLink>
          <NavLink
            to="/panel/addBank"
            className={({ isActive }) =>
              `${
                isActive ? "bg-red-500/20 border-red-500/30 text-rose-100 shadow-[0_0_10px_rgba(239,68,68,0.1)]" : "border-transparent text-slate-400 hover:text-white hover:bg-white/5"
              } p-4 rounded-xl border transition-all font-bold flex items-center gap-3 mt-auto`
            }
          >
            <PlusCircle className="w-5 h-5" />
            Add Blood Bank
          </NavLink>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
