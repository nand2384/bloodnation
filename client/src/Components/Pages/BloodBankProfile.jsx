import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggedNavbar from "../Common/Navbar/LoggedNavbar";
import LoggedBankNavbar from "../Common/Navbar/LoggedBankNavbar";
import { Building2, Mail, Phone, MapPin, Hash, Key, Activity, Calendar } from "lucide-react";
import { useDialogue } from "../Common/Dialogue/DialogueContext";

function BloodBankProfile() {
  const navigate = useNavigate();
  const { showAlert } = useDialogue();

  const [loading, setLoading] = useState(false);

  const [bloodBankName, setBloodBankName] = useState();
  const [bankId, setBankId] = useState();
  const [bankEmail, setBankEmail] = useState();
  const [bloodBankCategory, setBloodBankCategory] = useState();
  const [licenseNumber, setLicenseNumber] = useState();
  const [licenseValidity, setLicenseValidity] = useState();
  const [contactPerson, setContactPerson] = useState();
  const [contactNumber, setContactNumber] = useState();
  const [address, setAddress] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);

  useEffect(() => {
    const verifyUser = async () => {
      setLoading(true);
      const token = localStorage.getItem("bankToken");
      if (token) {
        try {
          const response = await fetch(
            "http://localhost:3000/api/verify/bloodbank",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const responseJSON = await response.json();
          const data = responseJSON.response;

          if (data) {
            setBloodBankName(data.bloodBankName);
            setBankId(data.bankId);
            setBankEmail(data.bankEmail);
            setBloodBankCategory(data.bloodBankCategory);
            setLicenseNumber(data.licenseNumber);
            setLicenseValidity(data.licenseValidity);
            setContactPerson(data.contactPerson);
            setContactNumber(data.contactNumber);
            setAddress(data.address);
            setState(data.state);
            setCity(data.city);
          } else {
            localStorage.clear();
            sessionStorage.clear();
            navigate("/bloodBankLogin");
          }
        } catch (error) {
          console.log("Fetching /api/verify/bloodbank Error: ", error);
          navigate("/home");
          localStorage.clear();
          sessionStorage.clear();
        } finally {
          setLoading(false);
        }
      } else {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/home");
      }
    };

    verifyUser();
  }, []);

  useEffect(() => {
    if(oldPassword && newPassword && confirmNewPassword == "") {
      setErrorStatus(true);
    } else if (newPassword !== confirmNewPassword) {
      setPasswordError("New Password didn't match!");
      setErrorStatus(true);
    } else {
      setPasswordError("");
      setErrorStatus(false);
    }
  }, [oldPassword, newPassword, confirmNewPassword]);

  const handleChangePassword = async () => {
    if (errorStatus === false) {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3000/api/bloodbank/changePassword",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              bankId,
              oldPassword,
              newPassword,
            }),
          }
        );

        const data = await response.json();
        const message = data.message;

        showAlert(message, 'success');

        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } catch (error) {
        console.log("Fetch Error: ", error);
      } finally {
        setLoading(false);
      }
    } else if (errorStatus == true) {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-rose-500/30 selection:text-rose-900 flex flex-col pt-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-5%] right-[-10%] w-[50vw] h-[50vw] bg-rose-400/10 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-10%] left-[-5%] w-[60vw] h-[60vw] bg-indigo-300/10 rounded-full blur-[120px] mix-blend-multiply animate-blob"></div>
      </div>

      <LoggedBankNavbar />
      {loading && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-md bg-white/60 transition-all">
          <div className="flex flex-col items-center justify-center glass-panel p-8 rounded-3xl border border-slate-200 shadow-xl">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-red-600 rounded-full animate-spin mb-4 shadow-sm"></div>
            <p className="text-sm font-bold text-slate-800 tracking-wide">Loading Dashboard...</p>
          </div>
        </div>
      )}

      {/* Header Container */}
      <div className="relative z-10 border-b border-slate-200 bg-white/50 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8 sm:py-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-rose-600 rounded-3xl flex items-center justify-center text-white shadow-lg transform rotate-3 border border-red-500/30">
                    <Building2 className="w-12 h-12 -rotate-3 drop-shadow-md" />
                </div>
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight drop-shadow-sm">{bloodBankName || "Bank Portal"}</h1>
                    <div className="flex items-center gap-2 text-slate-600 mt-2 font-medium">
                        <MapPin className="w-4 h-4 text-red-600" />
                        <span className="tracking-wide">{city}{state ? `, ${state}` : ""}</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-8 lg:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info Card */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-panel rounded-3xl border-slate-200 bg-white/80 p-6 sm:p-8 relative overflow-hidden group hover:border-red-200 transition-colors duration-500 shadow-sm">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <Activity className="w-64 h-64 text-slate-500" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2 tracking-wide">
                    <Building2 className="w-6 h-6 text-red-600" />
                    Blood Bank Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 relative z-10 mb-8">
                    <div className="space-y-1.5 flex flex-col">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><Hash className="w-4 h-4 text-slate-400"/> Bank ID</p>
                        <p className="font-bold text-xl text-slate-800 font-mono bg-slate-50 py-2 px-4 rounded-xl w-max border border-slate-200 shadow-sm">{bankId || "-"}</p>
                    </div>
                    <div className="space-y-1.5 flex flex-col">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><Mail className="w-4 h-4 text-slate-400"/> Registered Email</p>
                        <p className="font-bold text-lg text-slate-800 break-all">{bankEmail || "-"}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12 relative z-10 pt-8 border-t border-slate-100">
                    <div className="space-y-1.5">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Category</p>
                        <div className="inline-flex mt-1">
                            <span className="px-4 py-1.5 bg-red-50 text-red-600 font-bold text-sm rounded-lg border border-red-200 shadow-sm tracking-wider">
                                {bloodBankCategory || "-"}
                            </span>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Contact Person</p>
                        <p className="font-bold text-xl text-slate-900">{contactPerson || "-"}</p>
                    </div>
                    <div className="space-y-1.5">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><Hash className="w-3.5 h-3.5"/> License No.</p>
                        <p className="font-bold text-slate-900 text-xl">{licenseNumber || "-"}</p>
                    </div>
                    <div className="space-y-1.5">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5"/> Validity</p>
                        <p className="font-bold text-slate-900 text-xl">{licenseValidity || "-"}</p>
                    </div>
                    <div className="space-y-1.5">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><Phone className="w-3.5 h-3.5"/> Contact Number</p>
                        <p className="font-bold text-slate-900 text-xl">{contactNumber || "-"}</p>
                    </div>
                    <div className="space-y-1.5 pt-1">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5"/> Full Address</p>
                        <p className="font-bold text-slate-900 leading-snug text-lg">{address || "-"}</p>
                        <p className="text-sm font-semibold text-slate-500 mt-1">{city}{state ? `, ${state}` : ""}</p>
                    </div>
                </div>
            </div>
          </div>

          {/* Sidebar / Security Card */}
          <div className="space-y-8">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-200 bg-white/80 relative overflow-hidden group hover:border-red-200 transition-colors duration-500 shadow-sm">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-slate-200 to-slate-300 opacity-50"></div>
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 tracking-wide">
                    <Key className="w-6 h-6 text-slate-400" />
                    Security
                </h2>
                <div className="space-y-5 relative z-10">
                    <div className="space-y-1.5 flex flex-col">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Current Password</label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium placeholder-slate-400 shadow-sm"
                        />
                    </div>
                    <div className="space-y-1.5 flex flex-col">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium placeholder-slate-400 shadow-sm"
                        />
                    </div>
                    <div className="space-y-1.5 flex flex-col">
                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Confirm New</label>
                        <input
                            type="password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                            placeholder="••••••••"
                            className={`w-full px-4 py-3 bg-white border text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium placeholder-slate-400 shadow-sm ${passwordError ? 'border-red-500' : 'border-slate-200'}`}
                        />
                    </div>
                    {passwordError && (
                        <p className="text-red-500 text-xs font-bold tracking-wide ml-1">{passwordError}</p>
                    )}
                    <button
                        onClick={handleChangePassword}
                        disabled={loading || !oldPassword || !newPassword || !confirmNewPassword}
                        className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all shadow-md border border-transparent disabled:opacity-50 disabled:cursor-not-allowed mt-4 cursor-pointer tracking-wide"
                    >
                        Update Password
                    </button>
                </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default BloodBankProfile;
