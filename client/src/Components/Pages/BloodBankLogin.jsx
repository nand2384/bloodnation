import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, ArrowLeft, Eye, EyeOff, Building2, UserCircle } from "lucide-react";
import { useDialogue } from "../Common/Dialogue/DialogueContext";

function BloodBankLogin() {
  const [bankId, setBankId] = useState("");
  const [bankIdErr, setBankIdErr] = useState("");

  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { showAlert } = useDialogue();

  useEffect(() => {
    const userStatus = sessionStorage.getItem("user");
    const bankStatus = sessionStorage.getItem("bank");
    const userToken = localStorage.getItem("token");
    const bankToken = localStorage.getItem("bankToken");
    if (userStatus) {
      navigate("/profile");
    } else if (bankStatus) {
      navigate("/bloodBankProfile");
    } else if (userToken && !userStatus) {
      sessionStorage.setItem("user", true);
      navigate("/home");
    } else if (bankToken && !bankToken) {
      sessionStorage.setItem("bank", true);
      navigate("/home");
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:3000/api/bloodbank/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ bankId, password }),
        }
      );
      const data = await response.json();
      const token = data.token;
      const message = data.message;

      if (token && token !== false) {
        localStorage.setItem("bankToken", token);
        sessionStorage.setItem("bank", true);
        navigate("/bloodBankProfile");
      } else {
        showAlert(message, 'error');
        if (token === null) {
          setBankId("");
          setPassword("");
          navigate("/");
        } else if (token === false) {
          setPassword("");
        }
      }
    } catch (error) {
      console.log("Fetch api/bloodbank/login error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-rose-500/30 selection:text-rose-900 relative overflow-hidden">
      {/* Background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] right-[10%] w-[40vw] h-[40vw] bg-rose-400/10 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[45vw] h-[45vw] bg-blue-400/10 rounded-full blur-[100px] mix-blend-multiply animate-blob"></div>
      </div>

      {loading && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-md bg-white/60 transition-all">
          <div className="flex flex-col items-center justify-center glass-panel p-8 rounded-3xl border border-slate-200 shadow-xl">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-red-600 rounded-full animate-spin mb-4 shadow-sm"></div>
            <p className="text-sm font-bold text-slate-800 tracking-wide">Accessing Portal...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="absolute top-0 w-full p-6 lg:p-8 z-10 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 group text-slate-600 hover:text-slate-900 transition-colors font-semibold hover:bg-slate-100/50 py-2 px-4 rounded-xl border border-transparent hover:border-slate-200">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-xl border border-slate-200 bg-white/50">
            <Building2 className="w-6 h-6 text-red-600" />
            <span className="font-bold text-xl text-slate-900 tracking-wider uppercase">Bank Portal</span>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-md glass-panel rounded-3xl p-8 sm:p-10 border-slate-200 relative overflow-hidden group hover:border-red-200 transition-colors duration-500 bg-white/80 shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-rose-500 rounded-t-3xl opacity-80"></div>
          
          <div className="text-center mb-10 mt-2">
            <div className="w-16 h-16 bg-red-50 border border-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                <Building2 className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-3 drop-shadow-sm">Blood Bank Log In</h1>
            <p className="text-slate-600 font-medium">Sign in to manage stock and availability.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-5">
              {/* Bank ID */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 ml-1 tracking-wider uppercase">Blood Bank ID</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <UserCircle className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    value={bankId}
                    onChange={(e) => setBankId(e.target.value)}
                    required
                    placeholder="Enter your Bank ID"
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium placeholder-slate-400 shadow-sm"
                  />
                </div>
                {bankIdErr && <p className="text-red-500 text-xs ml-1 font-bold tracking-wide">{bankIdErr}</p>}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 ml-1 tracking-wider uppercase">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full pl-11 pr-12 py-3.5 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium placeholder-slate-400 tracking-wide shadow-sm"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {passwordErr && <p className="text-red-500 text-xs ml-1 font-bold tracking-wide">{passwordErr}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-4 font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed border border-red-500 mt-6 tracking-wide text-lg"
            >
              Access Portal
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default BloodBankLogin;
