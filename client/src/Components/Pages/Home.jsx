import React, { useEffect, useState } from 'react'
import Navbar from '../Common/Navbar/Navbar'
import LoggedNavbar from '../Common/Navbar/LoggedNavbar'
import { Link } from 'react-router-dom'
import LoggedBankNavbar from '../Common/Navbar/LoggedBankNavbar';
import { Droplet, Heart, Shield, Activity, ArrowRight } from 'lucide-react';

function Home() {   
  
  const [navComponent, setNavComponent] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {

      const token = localStorage.getItem("token");
      const bankToken = localStorage.getItem("bankToken");
      if (token) {
        setNavComponent(<LoggedNavbar />)
        try {
          const response = await fetch('http://localhost:3000/api/fetch/user', {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          });

          const data = await response.json();

          if (data) {
            setNavComponent(<LoggedNavbar />)
            sessionStorage.setItem("user", true);
          } else {
            localStorage.removeItem("token");
            sessionStorage.removeItem("user");
            setNavComponent(<Navbar />)
          }

        } catch (error) {
          console.log("Fetching /api/verify/user Error: ", error);
          setNavComponent(<Navbar />)
        }
      } else if (bankToken) {
        setNavComponent(<LoggedBankNavbar />);
        try {
          const response = await fetch('http://localhost:3000/api/verify/bloodbank', {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${bankToken}`
            }
          });
          
          const data = await response.json();

          if (data) {
            setNavComponent(<LoggedBankNavbar />);
            sessionStorage.setItem("bank", true);
          } else {
            localStorage.removeItem("bankToken");
            sessionStorage.removeItem("bank");
            setNavComponent(<Navbar />)
          }
        } catch (error) {
          console.log("Fetching /api/verify/bloodbank Error: ", error);
          setNavComponent(<Navbar />)
        }
      } else {
        localStorage.clear();
        sessionStorage.clear();
        setNavComponent(<Navbar />)
      } 
    }
    fetchUser();
    }, []);

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-rose-500/30 selection:text-rose-900 flex flex-col relative overflow-hidden">
        {navComponent}
        
        {/* Soft Animated Orbs Background */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-rose-400/10 rounded-full blur-[120px] mix-blend-multiply animate-blob"></div>
            <div className="absolute top-[20%] right-[-10%] w-[45vw] h-[45vw] bg-blue-400/10 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000"></div>
            <div className="absolute bottom-[-20%] left-[10%] w-[60vw] h-[60vw] bg-indigo-400/10 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-4000"></div>
        </div>

        {/* Main Content with top padding to account for fixed navbar */}
        <main className="flex-grow pt-28 relative z-10">
          
          {/* Hero Section */}
          <section className="relative px-6 lg:px-8 pt-16 pb-24 md:pt-24 md:pb-32">
            <div className="max-w-7xl mx-auto">
              <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
                
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-200 bg-red-50 text-red-600 text-sm font-bold mb-8 backdrop-blur-md shadow-sm uppercase tracking-widest">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                  Saving Lives Nationwide
                </div>
                
                <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-8 drop-shadow-sm">
                  Every Drop Counts. <br className="hidden md:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-500 to-indigo-600">
                    Be a Hero Today.
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-12 max-w-2xl font-medium">
                  Blood Nation is a nationwide platform simplifying blood donation and requests. We connect compassionate donors with recipients in need instantly, reliably, and seamlessly.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full sm:w-auto">
                  <Link 
                    to="/bloodAvailability" 
                    className="w-full sm:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2 group border border-red-500"
                  >
                    Find Blood Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    to="/about" 
                    className="w-full sm:w-auto px-8 py-4 glass-panel text-slate-700 rounded-2xl font-bold text-lg transition-all duration-300 hover:bg-slate-100 hover:-translate-y-1 flex items-center justify-center hover:text-slate-900"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-24 relative z-10">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="text-center mb-20 relative">
                <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight drop-shadow-sm">Why Choose Blood Nation?</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-transparent mx-auto rounded-full mb-6"></div>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg font-medium">Our platform is built to provide rapid, secure, and nationwide reach to make sure nobody has to wait for life-saving blood.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 relative">
                {/* Feature 1 */}
                <div className="glass-panel p-8 rounded-3xl group hover:-translate-y-2 transition-all duration-300 hover:border-red-200 hover:bg-red-50/50">
                  <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-6 text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300 border border-red-200 shadow-sm">
                    <Activity className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Real-time Data</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    Check up-to-date blood stock availability across thousands of registered blood banks in just a few clicks.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="glass-panel p-8 rounded-3xl group hover:-translate-y-2 transition-all duration-300 hover:border-rose-200 hover:bg-rose-50/50">
                  <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300 border border-rose-200 shadow-sm">
                    <Heart className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Donor Community</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    Join a growing community of life-savers. Connect directly with those in urgent need of rare blood types.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="glass-panel p-8 rounded-3xl group hover:-translate-y-2 transition-all duration-300 hover:border-indigo-200 hover:bg-indigo-50/50">
                  <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 border border-indigo-200 shadow-sm">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Secure & Verified</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    All blood banks and stock information are verified to ensure absolute trust in critical healthcare situations.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        
        {/* Transparent Footer */}
        <footer className="relative z-10 border-t border-slate-200 py-8 mt-auto backdrop-blur-sm bg-white/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
             <div className="flex items-center gap-2 border border-slate-200 px-4 py-2 rounded-xl bg-white/80">
               <Droplet className="w-4 h-4 text-red-600" />
               <span className="font-bold text-slate-800 tracking-wide uppercase text-sm">Blood Nation</span>
             </div>
             <p className="text-slate-500 text-sm font-medium">© {new Date().getFullYear()} Blood Nation. All rights reserved.</p>
          </div>
        </footer>
    </div>
  )
}

export default Home