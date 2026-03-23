import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowLeft, User, Activity, Droplet } from "lucide-react";
import { useDialogue } from "../Common/Dialogue/DialogueContext";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [age, setAge] = useState();
  const [gender, setGender] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [passwordError, setPasswordError] = useState("");

  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { showAlert } = useDialogue();

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setFatherName('');
    setAge('');
    setGender('');
    setBloodGroup('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  }

  useEffect(() => {
    const userStatus = sessionStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (userStatus) {
      navigate("/profile");
    } else if (token && !userStatus) {
      sessionStorage.setItem("user", true);
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    if (password.length == 0) {
      setPasswordError("");
      setError(true);
    } else if (password.length < 6) {
      setPasswordError("Password must contain more than 6 characters!");
      setError(true);
    } else if (confirmPassword === "") {
      setPasswordError("");
      setError(true);
    } else if (password !== confirmPassword) {
      setPasswordError("Both Passwords didn't match!");
      setError(true);
    } else {
      setPasswordError("");
      setError(false);
    }
  }, [password, confirmPassword]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(error == false) {
      try {
        const response = await fetch("http://localhost:3000/api/user/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            fatherName: fatherName,
            age: age,
            gender: gender,
            bloodGroup: bloodGroup,
            email: email,
            password: password,
          }),
      });
      
      const data = await response.json();
      const token = data.token;
      
      if (token == true) {
        const message = data.message;
        showAlert(message, 'success');
      } else {
        localStorage.setItem("token", token);
        sessionStorage.setItem("user", true);
        navigate("/profile");
      }
    } catch (error) {
      console.log("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  } else if(error == true) {
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
            <p className="text-sm font-bold text-slate-800 tracking-wide">Creating Account...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="w-full p-6 lg:p-8 z-10 flex justify-between items-center shrink-0">
        <Link to="/" className="flex items-center gap-2 group text-slate-600 hover:text-slate-900 transition-colors font-semibold hover:bg-slate-100/50 py-2 px-4 rounded-xl border border-transparent hover:border-slate-200">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>
        <div className="flex items-center gap-2 glass-panel px-4 py-2 rounded-xl border border-slate-200 bg-white/50">
            <Droplet className="w-6 h-6 text-red-600" />
            <span className="font-bold text-xl text-slate-900 tracking-wider uppercase hidden sm:block">Blood Nation</span>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 relative z-10 pb-12">
        <div className="w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-10 border-slate-200 relative overflow-hidden group hover:border-red-200 transition-colors duration-500 bg-white/80 shadow-lg">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-rose-500 rounded-t-3xl opacity-80"></div>
          
          <div className="text-center mb-8 mt-2">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-3 drop-shadow-sm">Become a Donor</h1>
            <p className="text-slate-600 font-medium">Join our nationwide community and start saving lives.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            
            {/* Personal Details */}
            <div className="bg-white/50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xs font-bold text-slate-700 mb-5 uppercase tracking-widest flex items-center gap-2">
                    <User className="w-4 h-4 text-red-600"/> Personal Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                    type="text"
                    value={firstName}
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium placeholder-slate-400 shadow-sm"
                />
                <input
                    type="text"
                    value={lastName}
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium placeholder-slate-400 shadow-sm"
                />
                <input
                    type="text"
                    value={fatherName}
                    placeholder="Father's Name"
                    onChange={(e) => setFatherName(e.target.value)}
                    required
                    className="w-full px-4 py-3.5 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium placeholder-slate-400 shadow-sm"
                />
                <div className="grid grid-cols-2 gap-5">
                    <input
                        type="number"
                        value={age}
                        placeholder="Age"
                        onChange={(e) => setAge(e.target.value)}
                        required
                        min="18"
                        max="65"
                        className="w-full px-4 py-3.5 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium placeholder-slate-400 shadow-sm"
                    />
                    <select
                        onChange={(e) => setGender(e.target.value)}
                        required
                        value={gender}
                        className="w-full px-4 py-3.5 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium appearance-none shadow-sm"
                    >
                        <option value="" disabled className="bg-white text-slate-400">Gender</option>
                        <option value="Male" className="bg-white text-slate-900">Male</option>
                        <option value="Female" className="bg-white text-slate-900">Female</option>
                        <option value="Other" className="bg-white text-slate-900">Other</option>
                    </select>
                </div>
                </div>
            </div>

            {/* Medical Info */}
            <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100 shadow-sm">
                <h3 className="text-xs font-bold text-red-700 mb-5 uppercase tracking-widest flex items-center gap-2">
                    <Activity className="w-4 h-4 text-red-600"/> Medical Info
                </h3>
                <select
                    onChange={(e) => setBloodGroup(e.target.value)}
                    required
                    value={bloodGroup}
                    className="w-full px-4 py-3.5 bg-white border border-red-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium appearance-none block shadow-sm"
                >
                    <option value="" disabled className="bg-white text-slate-400">Select Blood Group</option>
                    {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                      <option key={bg} value={bg} className="bg-white text-slate-900">{bg}</option>
                    ))}
                </select>
            </div>

            {/* Account Info */}
            <div className="bg-white/50 p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="text-xs font-bold text-slate-700 mb-5 uppercase tracking-widest flex items-center gap-2">
                    <Lock className="w-4 h-4 text-red-600"/> Account Security
                </h3>
                <div className="space-y-5">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="email"
                            value={email}
                            placeholder="Email Address"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium placeholder-slate-400 shadow-sm"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium placeholder-slate-400 tracking-wide shadow-sm"
                            />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                placeholder="Confirm Password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className={`w-full pl-11 pr-4 py-3.5 bg-white border text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium placeholder-slate-400 tracking-wide shadow-sm ${passwordError ? 'border-red-500' : 'border-slate-200'}`}
                            />
                        </div>
                    </div>
                    {passwordError && (
                        <p className="text-red-500 text-xs font-bold tracking-wide ml-1">{passwordError}</p>
                    )}
                    <div className="flex items-center gap-2 ml-1 mt-3">
                        <input
                            type="checkbox"
                            checked={showPassword}
                            onChange={() => setShowPassword((prev) => !prev)}
                            className="w-4 h-4 text-red-600 rounded border-slate-300 bg-white focus:ring-red-500 focus:ring-offset-slate-50 cursor-pointer"
                            id="show-pass"
                        />
                        <label htmlFor="show-pass" className="text-sm font-bold text-slate-600 cursor-pointer tracking-wide uppercase text-[10px]">
                            Show Passwords
                        </label>
                    </div>
                </div>
            </div>

            <button
              type="submit"
              disabled={loading || error}
              className="w-full bg-red-600 hover:bg-red-700 text-white rounded-xl py-4 font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed text-lg mt-6 border border-red-500 tracking-wide"
            >
              Create Account
            </button>
          </form>

          <div className="mt-8 text-center text-slate-600 font-medium">
            Already have an account?{" "}
            <Link to="/login" className="text-slate-900 hover:text-red-600 font-bold hover:underline transition-all underline-offset-4">
              Sign In
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;
