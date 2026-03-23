import React, { useState, useEffect } from "react";
import LoggedNavbar from "../Common/Navbar/LoggedNavbar";
import { useNavigate } from "react-router-dom";
import { User, Mail, Droplet, Calendar, Edit3, Key, X, Save, Activity } from "lucide-react";
import { useDialogue } from "../Common/Dialogue/DialogueContext";

function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [email, setEmail] = useState("");

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [errorStatus, setErrorStatus] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { showAlert } = useDialogue();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState({});

  const [modalErrorStatus, setModalErrorStatus] = useState(false);

  const handleEdit = () => {
    setEditData({
      firstName,
      lastName,
      fatherName,
      age,
      bloodGroup,
      email,
    });
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditData({});
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (modalErrorStatus == false) {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          "http://localhost:3000/api/updateProfile",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(editData),
          }
        );

        if (response.status == 200) {
          return;
        } else if (response.status == 401) {
          const responseData = await response.json();
          showAlert(responseData.message, 'error');
        }
      } catch (error) {
        console.log("Error updating profile:", error);
        setLoading(false);
        handleCloseModal();
      } finally {
        setLoading(false);
        fetchUser();
        handleCloseModal();
      }
    }
  };

  const fetchUser = async () => {
    setLoading(true);

    const token = localStorage.getItem("token");
    const bankToken = localStorage.getItem("bankToken");
    if (token) {
      try {
        const response = await fetch("http://localhost:3000/api/fetch/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const status = response.status;

        if (status == 200) {
          const responseJSON = await response.json();
          const data = responseJSON.response;

          setFirstName(data.firstName);
          setLastName(data.lastName);
          setFatherName(data.fatherName);
          setGender(data.gender);
          setAge(data.age);
          setBloodGroup(data.bloodGroup);
          setEmail(data.email);
        } else if(status == 404) {
          showAlert("Email changed, please login again!", 'info');
          localStorage.clear();
          sessionStorage.clear();
          navigate('/login');
        } else if (bankToken) {
          localStorage.removeItem("token");
          sessionStorage.removeItem("user");
          navigate("/bloodBankProfile");
        } else {
          localStorage.clear();
          sessionStorage.clear();
          navigate("/");
        }
      } catch (error) {
        console.log("Fetching /api/verify/user Error: ", error);
        navigate("/home");
        localStorage.clear();
        sessionStorage.clear();
      } finally {
        setLoading(false);
      }
    } else {
      localStorage.clear();
      navigate("/home");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    if (newPassword !== confirmNewPassword) {
      setPasswordError("New Password didn't match!");
      setErrorStatus(true);
    } else {
      setPasswordError("");
      setErrorStatus(false);
    }
  }, [oldPassword, newPassword, confirmNewPassword]);

  const handleChangePassword = async () => {
    setLoading(true);
    if (errorStatus == false) {
      try {
        const response = await fetch(
          "http://localhost:3000/api/changePassword",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email,
              oldPassword: oldPassword,
              newPassword: newPassword,
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
          <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-rose-400/10 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-300/10 rounded-full blur-[120px] mix-blend-multiply animate-blob"></div>
      </div>

      <LoggedNavbar />
      {loading && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-md bg-white/60 transition-all">
          <div className="flex flex-col items-center justify-center glass-panel p-8 rounded-3xl border border-slate-200 shadow-xl">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-red-600 rounded-full animate-spin mb-4 shadow-sm"></div>
            <p className="text-sm font-bold text-slate-800 tracking-wide">Loading Profile...</p>
          </div>
        </div>
      )}

      {/* Header Container */}
      <div className="relative z-10 border-b border-slate-200 bg-white/50 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8 sm:py-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-rose-600 rounded-3xl flex items-center justify-center text-white shadow-lg transform rotate-3 border border-red-500/30">
                    <User className="w-12 h-12 -rotate-3 drop-shadow-md" />
                </div>
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight drop-shadow-sm">{firstName} {lastName}</h1>
                    <div className="flex items-center gap-2 text-slate-600 mt-2 font-medium">
                        <Mail className="w-4 h-4 text-red-600" />
                        <span className="tracking-wide">{email}</span>
                    </div>
                </div>
            </div>
            <button
                onClick={handleEdit}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 hover:border-red-500 transition-all shadow-sm w-full md:w-auto justify-center cursor-pointer"
            >
                <Edit3 className="w-4 h-4 text-red-600 group-hover:text-red-700" />
                Edit Profile
            </button>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-8 lg:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info Card */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-panel rounded-3xl border-slate-200 p-6 sm:p-8 relative overflow-hidden bg-white/80 group hover:border-red-200 transition-colors duration-500 shadow-sm">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <Activity className="w-64 h-64 text-slate-500" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2 tracking-wide">
                    <User className="w-6 h-6 text-red-600" />
                    Personal Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12 relative z-10">
                    <div className="space-y-1.5 flex flex-col">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">First Name</p>
                        <p className="font-bold text-xl text-slate-900">{firstName || "-"}</p>
                    </div>
                    <div className="space-y-1.5 flex flex-col">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Last Name</p>
                        <p className="font-bold text-xl text-slate-900">{lastName || "-"}</p>
                    </div>
                    <div className="space-y-1.5 flex flex-col">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Father's Name</p>
                        <p className="font-bold text-xl text-slate-900">{fatherName || "-"}</p>
                    </div>
                    <div className="space-y-1.5 flex flex-col">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                            <Droplet className="w-3.5 h-3.5"/> Blood Group
                        </p>
                        <div className="inline-flex mt-1">
                            <span className="px-4 py-1.5 bg-red-50 text-red-600 font-bold rounded-lg border border-red-200 tracking-wider shadow-sm">
                                {bloodGroup || "-"}
                            </span>
                        </div>
                    </div>
                    <div className="space-y-1.5 flex flex-col">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Gender</p>
                        <p className="font-bold text-xl text-slate-900">{gender || "-"}</p>
                    </div>
                    <div className="space-y-1.5 flex flex-col">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5"/> Age
                        </p>
                        <p className="font-bold text-xl text-slate-900">{age ? `${age} yrs` : "-"}</p>
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

      {/* Modal section */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={handleCloseModal}></div>
          <div className="bg-white border text-slate-900 border-slate-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full relative z-10 transform transition-all max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <Edit3 className="w-6 h-6 text-red-600" />
                    Edit Profile
                </h2>
                <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full cursor-pointer">
                    <X className="w-5 h-5"/>
                </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider pl-1">First Name</label>
                <input
                  type="text"
                  value={editData.firstName || ''}
                  onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium shadow-sm cursor-text"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider pl-1">Last Name</label>
                <input
                  type="text"
                  value={editData.lastName || ''}
                  onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium shadow-sm cursor-text"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider pl-1">Father's Name</label>
                <input
                  type="text"
                  value={editData.fatherName || ''}
                  onChange={(e) => setEditData({ ...editData, fatherName: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium shadow-sm cursor-text"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider pl-1">Age</label>
                <input
                  type="number"
                  value={editData.age || ''}
                  onChange={(e) => setEditData({ ...editData, age: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium shadow-sm cursor-text"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider pl-1">Blood Group</label>
                <select
                  value={editData.bloodGroup || ''}
                  onChange={(e) => setEditData({ ...editData, bloodGroup: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium appearance-none cursor-pointer shadow-sm"
                >
                  <option value="" disabled className="bg-white text-slate-400">Select Blood Group</option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                      <option key={bg} value={bg} className="bg-white">{bg}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider pl-1">Email Address</label>
                <input
                  type="email"
                  value={editData.email || ''}
                  onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium shadow-sm cursor-text"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={handleCloseModal}
                className="px-6 py-3.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all w-full sm:w-auto cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="px-8 py-3.5 bg-red-600 hover:bg-red-700 border border-red-500 text-white font-bold rounded-xl transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer tracking-wide"
              >
                <Save className="w-5 h-5 drop-shadow-sm" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
