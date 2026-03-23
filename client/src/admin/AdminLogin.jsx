import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, User, ArrowRight } from 'lucide-react';
import { useDialogue } from '../Components/Common/Dialogue/DialogueContext';

function AdminLogin() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const { showAlert } = useDialogue();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
      let adminStatus = sessionStorage.getItem("admin");

      if (adminStatus) {
        navigate('/panel');
      } else {
        return;
      }
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
          const result = await fetch('http://localhost:3000/admin/login', {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username: username,
              password: password
            })
          })
          const resultJSON = await result.json();
          const data = resultJSON.response;

          if(data == true) {
            sessionStorage.setItem("admin", data);
            navigate('/panel');
          } else if(data == false) {
            showAlert("Unauthorized access, go back to home page immediately!", 'error');
          }
        } catch (error) {
          console.log("Fetch Error: ", error);
        } finally {
          setLoading(false);
        }
    }

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col font-sans selection:bg-rose-500/30 selection:text-rose-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-rose-600/10 rounded-full blur-[100px] mix-blend-screen animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[45vw] h-[45vw] bg-indigo-900/10 rounded-full blur-[100px] mix-blend-screen animate-blob"></div>
      </div>

      {loading && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-md bg-slate-950/60 transition-all">
          <div className="flex flex-col items-center justify-center glass-panel p-8 rounded-3xl">
            <div className="w-12 h-12 border-4 border-slate-700 border-t-red-500 rounded-full animate-spin mb-4 shadow-[0_0_15px_rgba(239,68,68,0.5)]"></div>
            <p className="text-sm font-bold text-white tracking-wide">Authenticating Admin...</p>
          </div>
        </div>
      )}

      <main className="flex-grow flex justify-center items-center p-6 relative z-10">
        <div className="w-full max-w-md glass-panel rounded-3xl p-8 sm:p-10 border-white/10 relative overflow-hidden group hover:border-red-500/30 transition-colors duration-500">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-rose-500 opacity-80 rounded-t-3xl"></div>
          
          <div className="text-center mb-10 mt-2">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <Shield className="w-8 h-8 text-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight mb-3 drop-shadow-md">Admin Portal</h1>
            <p className="text-slate-400 font-light">Secure access for authorized personnel.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-5">
              {/* Username Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 ml-1 tracking-wider uppercase">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-500" />
                  </div>
                  <input 
                    type="text" 
                    required 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Enter admin username" 
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-950/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium placeholder-slate-600 backdrop-blur-sm shadow-inner" 
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300 ml-1 tracking-wider uppercase">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-500" />
                  </div>
                  <input 
                    type="password" 
                    required 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="••••••••" 
                    className="w-full pl-11 pr-12 py-3.5 bg-slate-950/50 border border-white/10 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium placeholder-slate-600 tracking-wide backdrop-blur-sm shadow-inner"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading || !username || !password}
              className="w-full bg-red-600/90 hover:bg-red-500 text-white rounded-xl py-4 font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed border border-red-500/50 mt-6 tracking-wide text-lg"
            >
              Sign In
              <ArrowRight className="w-5 h-5 drop-shadow-md" />
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default AdminLogin
