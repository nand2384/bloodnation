import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

function BloodBanks() {
    const [bloodStock, setBloodStock] = useState([]);
    useEffect(() => {
      const fetchBloodStock = async () => {
        try {
          const response = await fetch("http://localhost:3000/admin/fetchBloodStock", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          const result = await response.json();
          setBloodStock(result);
        } catch (error) {
          console.log("Fetch Error: ", error);
        }
      };
      fetchBloodStock();
    }, []);
  return (
    <>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 bg-white">
          <div className="flex items-center justify-between p-4 border-b shadow">
            {/* <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-blue-900 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button> */}
            <h1 className="text-2xl font-semibold text-blue-900">
              Blood Banks
            </h1>
          </div>
          <div className="p-6 text-gray-800">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="px-4 py-2 border">Blood Bank Name</th>
                    <th className="px-4 py-2 border">State</th>
                    <th className="px-4 py-2 border">City</th>
                  </tr>
                </thead>
                <tbody>
                  {bloodStock.map((bank, index) => (
                    <tr key={bank.id || index} className="border-t">
                      <td className="px-4 py-2 border">{bank.bloodBankName}</td>
                      <td className="px-4 py-2 border">{bank.state}</td>
                      <td className="px-4 py-2 border">{bank.city}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BloodBanks;
