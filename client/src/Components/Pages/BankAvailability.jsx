import React, { useEffect, useState } from "react";
import LoggedBankNavbar from "../Common/Navbar/LoggedBankNavbar";
import { Droplet, PlusCircle, Activity, Database, Edit2, Edit3, Trash2, X, Save, AlertCircle } from "lucide-react";
import { useDialogue } from "../../Components/Common/Dialogue/DialogueContext.jsx";

function BankAvailability() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [newBloodGroup, setNewBloodGroup] = useState("");
  const [newBloodType, setNewBloodType] = useState("");
  const [newQuantity, setNewQuantity] = useState("");
  const [editId, setEditId] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [bloodStockList, setBloodStockList] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [errorStatus1, setErrorStatus1] = useState(false);
  const [errorStatus2, setErrorStatus2] = useState(false);

  const [modalErrorStatus, setModalErrorStatus] = useState(false);

  const [loading, setLoading] = useState(false);
  const { showConfirm } = useDialogue();

  const resetForm = () => {
    setBloodGroup("");
    setBloodType("");
    setQuantity("");
    setEditId(null);
    setShowModal(false);
  };

  const fetchStockList = async () => {
    setLoading(true);
    try {
      const bankToken = localStorage.getItem("bankToken");
      const response = await fetch(
        "http://localhost:3000/api/fetch/bloodstock",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${bankToken}`,
          },
        }
      );

      const object = await response.json();
      const data = object.response;
      setBloodStockList(data);
    } catch (error) {
      console.log("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockList();
  }, []);

  useEffect(() => {
    console.log("Updated bloodStockList:", bloodStockList);
  }, [bloodStockList]);

  useEffect(() => {
    const duplicateExists = bloodStockList.some(
      (item) => item.bloodGroup === bloodGroup && item.bloodType === bloodType
    );
    if (duplicateExists) {
      setErrorMessage(
        "This blood group and type already exists, please update instead."
      );
      setErrorStatus1(true);
    } else {
      setErrorMessage("");
      setErrorStatus1(false);
    }
  }, [bloodGroup, bloodType, bloodStockList]);

  useEffect(() => {
    if(bloodGroup == "" || bloodType == "" || quantity == "") {
      setErrorStatus2(true);
    } else {
      setErrorStatus2(false);
    }
  }, [bloodGroup, bloodType, quantity])

  useEffect(() => {
    if (newBloodGroup == "" || newBloodType == "" || newQuantity == "") {
      setModalErrorStatus(true);
    } else {
      setModalErrorStatus(false);
    }
  }, [newBloodGroup, newBloodType, newQuantity]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bankToken = localStorage.getItem("bankToken");

    if (errorStatus1 == false && errorStatus2 == false) {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3000/api/add/bloodstock",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${bankToken}`,
            },
            body: JSON.stringify({ bloodGroup, bloodType, quantity }),
          }
        );

        resetForm();
        fetchStockList();
      } catch (error) {
        console.log("Error submitting the bank data: ", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (stock) => {
    setNewBloodGroup(stock.bloodGroup);
    setNewBloodType(stock.bloodType);
    setNewQuantity(stock.quantity);
    setEditId(stock.id);
    setShowModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const bankToken = localStorage.getItem("bankToken");
    try {
      const response = await fetch(
        "http://localhost:3000/api/update/bloodstock",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            editId,
            newBloodGroup,
            newBloodType,
            newQuantity,
          }),
        }
      );

      const responseData = await response.json();
      const message = responseData.message;

      resetForm();
      fetchStockList();
    } catch (error) {
      console.log("Error fetching /update/bloodstock: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (stockId) => {
    const isConfirmed = await showConfirm("Do you want to delete this bloodstock?");
    if (isConfirmed) {
      setLoading(true);
      try {
        const response = await fetch(
          "http://localhost:3000/api/delete/bloodstock",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ stockId }),
          }
        );

        const responseData = await response.json();
        const message = responseData.message;

        resetForm();
        fetchStockList();
      } catch (error) {
        console.log("Error fetching /delete/bloodstock: ", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-rose-500/30 selection:text-rose-900 flex flex-col pt-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-rose-400/10 rounded-full blur-[120px] mix-blend-multiply animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-indigo-300/10 rounded-full blur-[120px] mix-blend-multiply animate-blob"></div>
      </div>

      <LoggedBankNavbar />
      
      {loading && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center backdrop-blur-md bg-white/60 transition-all">
          <div className="flex flex-col items-center justify-center glass-panel p-8 rounded-3xl border border-slate-200 shadow-xl">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-red-600 rounded-full animate-spin mb-4 shadow-sm"></div>
            <p className="text-sm font-bold text-slate-800 tracking-wide">Processing...</p>
          </div>
        </div>
      )}

      {/* Header Container */}
      <div className="relative z-10 border-b border-slate-200 bg-white/50 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-8 sm:py-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-rose-600 rounded-3xl flex items-center justify-center text-white shadow-lg transform rotate-3 border border-red-500/30">
                    <Droplet className="w-12 h-12 -rotate-3 drop-shadow-md" />
                </div>
                <div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight drop-shadow-sm">Blood Stock Inventory</h1>
                    <p className="flex items-center gap-2 text-slate-600 mt-2 font-medium">Manage and update your available blood components</p>
                </div>
            </div>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto w-full px-6 py-8 lg:py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Form Section */}
          <div className="lg:col-span-1 space-y-8">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-200 bg-white/80 relative overflow-hidden group hover:border-red-200 transition-colors duration-500 shadow-sm flex flex-col">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <PlusCircle className="w-48 h-48 text-slate-500" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 tracking-wide">
                    <PlusCircle className="w-6 h-6 text-red-600" />
                    Add Blood Stock
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5 relative z-10 flex-grow">
                    <div className="space-y-1.5 flex flex-col">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider pl-1">
                        Blood Group
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium appearance-none shadow-sm cursor-pointer"
                        value={bloodGroup}
                        onChange={(e) => setBloodGroup(e.target.value)}
                      >
                        <option value="" disabled className="bg-white text-slate-400">
                          Select Blood Group
                        </option>
                        {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                          <option key={bg} value={bg} className="bg-white">{bg}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5 flex flex-col">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider pl-1">
                        Blood Type
                      </label>
                      <select
                        className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium appearance-none shadow-sm cursor-pointer"
                        value={bloodType}
                        onChange={(e) => setBloodType(e.target.value)}
                      >
                        <option value="" disabled className="bg-white text-slate-400">
                          Select Blood Type
                        </option>
                        <option value="Whole Blood">Whole Blood</option>
                        <option value="Single Donor Platelet">Single Donor Platelet</option>
                        <option value="Single Donor Plasma">Single Donor Plasma</option>
                        <option value="Sagm Packed Red Blood Cells">Sagm Packed Red Blood Cells</option>
                        <option value="Random Donor Platelets">Random Donor Platelets</option>
                        <option value="Platelet Rich Plasma">Platelet Rich Plasma</option>
                        <option value="Platelet Concentrate">Platelet Concentrate</option>
                        <option value="Plasma">Plasma</option>
                        <option value="Packed Red Blood Cells">Packed Red Blood Cells</option>
                        <option value="Leukoreduced RBC">Leukoreduced RBC</option>
                        <option value="Irradiated RBC">Irradiated RBC</option>
                        <option value="Fresh Frozen Plasma">Fresh Frozen Plasma</option>
                        <option value="Cryoprecipitate">Cryoprecipitate</option>
                        <option value="Cryo Poor Plasma">Cryo Poor Plasma</option>
                      </select>
                    </div>

                    <div className="space-y-1.5 flex flex-col">
                      <label className="text-xs font-bold text-slate-700 uppercase tracking-wider pl-1">
                        Quantity
                      </label>
                      <input
                        type="number"
                        min="1"
                        className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium placeholder-slate-400 shadow-sm cursor-text"
                        placeholder="e.g. 5"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </div>

                    {errorMessage && (
                        <div className="flex items-start gap-2 text-red-600 bg-red-50 p-3 rounded-lg border border-red-100">
                            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                            <p className="text-sm font-semibold tracking-wide">{errorMessage}</p>
                        </div>
                    )}
                    
                    <button
                      type="submit"
                      disabled={errorStatus2}
                      className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-md mt-6 cursor-pointer tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <PlusCircle className="w-5 h-5 drop-shadow-sm" />
                      Add Stock
                    </button>
                </form>
            </div>
          </div>

          {/* Table Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-200 bg-white/80 relative overflow-hidden group hover:border-red-200 transition-colors duration-500 shadow-sm flex flex-col h-full">
                <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <Activity className="w-64 h-64 text-slate-500" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2 tracking-wide relative z-10">
                    <Database className="w-6 h-6 text-red-600" />
                    Current Blood Stock
                </h2>
                
                <div className="relative z-10 overflow-x-auto rounded-2xl border border-slate-200 bg-white flex-grow">
                  <table className="w-full text-left border-collapse min-w-max">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest min-w-[120px]">Blood Group</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest">Type</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Quantity</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {bloodStockList.length === 0 ? (
                        <tr>
                          <td
                            colSpan="4"
                            className="px-6 py-12 text-center text-slate-500 font-medium"
                          >
                            <div className="flex flex-col items-center justify-center gap-3">
                                <Database className="w-10 h-10 text-slate-300" />
                                <span>No blood stock available. Add some above.</span>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        bloodStockList.map((bank) => (
                          <tr key={bank.id} className="hover:bg-slate-50/50 transition-colors group/row">
                            <td className="px-6 py-4 font-bold text-slate-900">
                                <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg bg-red-50 text-red-600 font-extrabold border border-red-100 min-w-[3.5rem] shadow-sm">
                                    {bank.bloodGroup}
                                </span>
                            </td>
                            <td className="px-6 py-4 font-semibold text-slate-700">{bank.bloodType}</td>
                            <td className="px-6 py-4 font-black text-slate-900 text-center text-lg">{bank.quantity}</td>
                            <td className="px-6 py-4 text-right">
                              <button
                                onClick={() => handleEdit(bank)}
                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors inline-block mr-2 cursor-pointer"
                                title="Edit"
                              >
                                <Edit2 className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleDelete(bank.id)}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors inline-block cursor-pointer"
                                title="Delete"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md" onClick={resetForm}></div>
          <div className="bg-white border text-slate-900 border-slate-200 rounded-3xl p-6 sm:p-8 max-w-xl w-full relative z-10 transform transition-all shadow-2xl">
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <Edit3 className="w-6 h-6 text-red-600" />
                    Edit Blood Stock
                </h2>
                <button onClick={resetForm} className="text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-slate-100 rounded-full cursor-pointer">
                    <X className="w-5 h-5"/>
                </button>
            </div>
            
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="space-y-1.5 flex flex-col">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider pl-1">
                  Blood Group
                </label>
                <select
                  className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium appearance-none shadow-sm cursor-pointer"
                  value={newBloodGroup}
                  onChange={(e) => setNewBloodGroup(e.target.value)}
                >
                  <option value="" disabled className="bg-white text-slate-400">
                    Select Blood Group
                  </option>
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                    <option key={bg} value={bg} className="bg-white">{bg}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5 flex flex-col">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider pl-1">
                  Blood Type
                </label>
                <select
                  className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium appearance-none shadow-sm cursor-pointer"
                  value={newBloodType}
                  onChange={(e) => setNewBloodType(e.target.value)}
                >
                  <option value="" disabled className="bg-white text-slate-400">
                    Select Blood Type
                  </option>
                  <option value="Whole Blood">Whole Blood</option>
                  <option value="Single Donor Platelet">Single Donor Platelet</option>
                  <option value="Single Donor Plasma">Single Donor Plasma</option>
                  <option value="Sagm Packed Red Blood Cells">Sagm Packed Red Blood Cells</option>
                  <option value="Random Donor Platelets">Random Donor Platelets</option>
                  <option value="Platelet Rich Plasma">Platelet Rich Plasma</option>
                  <option value="Platelet Concentrate">Platelet Concentrate</option>
                  <option value="Plasma">Plasma</option>
                  <option value="Packed Red Blood Cells">Packed Red Blood Cells</option>
                  <option value="Leukoreduced RBC">Leukoreduced RBC</option>
                  <option value="Irradiated RBC">Irradiated RBC</option>
                  <option value="Fresh Frozen Plasma">Fresh Frozen Plasma</option>
                  <option value="Cryoprecipitate">Cryoprecipitate</option>
                  <option value="Cryo Poor Plasma">Cryo Poor Plasma</option>
                </select>
              </div>

              <div className="space-y-1.5 flex flex-col">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider pl-1">
                  Quantity
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-3 bg-white border border-slate-200 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all font-medium shadow-sm cursor-text"
                  value={newQuantity}
                  onChange={(e) => setNewQuantity(e.target.value)}
                  placeholder="Quantity"
                />
              </div>

              <div className="flex justify-end gap-4 mt-8 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all w-full sm:w-auto cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={modalErrorStatus}
                  className="px-8 py-3.5 bg-red-600 hover:bg-red-700 border border-red-500 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 w-full sm:w-auto cursor-pointer tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5 drop-shadow-sm" />
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BankAvailability;
