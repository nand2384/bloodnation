import React, { useEffect } from "react";
import { LogOut, Activity } from "lucide-react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

function AdminPanel() {

  const navigate = useNavigate();

  useEffect(() => {
    const status = sessionStorage.getItem("admin");

    if (status == null) {
      navigate('/admin')
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#020617] flex font-sans selection:bg-rose-500/30 selection:text-rose-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] right-[10%] w-[40vw] h-[40vw] bg-rose-600/10 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[45vw] h-[45vw] bg-indigo-900/10 rounded-full blur-[100px] mix-blend-screen animate-blob"></div>
      </div>

      <Sidebar />
      <div className="flex-1 flex flex-col relative z-10">
        <header className="glass-panel border-b border-x-0 border-t-0 border-white/10 px-8 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-black text-white tracking-tight drop-shadow-md">
            Dashboard Overview
          </h1>
          <button 
            onClick={() => {
                sessionStorage.removeItem("admin");
                navigate('/admin');
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-red-500/20 text-slate-300 hover:text-red-400 border border-transparent hover:border-red-500/30 rounded-xl transition-all font-bold backdrop-blur-sm cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </header>
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="glass-panel rounded-3xl p-8 border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <Activity className="w-64 h-64 text-white" />
            </div>
            <h2 className="text-xl font-bold text-white mb-4 relative z-10">System Status</h2>
            <p className="text-slate-400 text-lg relative z-10 max-w-2xl leading-relaxed">
              Welcome to the administrative portal. Dashboard insights, system overview, and quick actions will be populated here in future updates. Please use the sidebar to navigate to active modules.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminPanel;
