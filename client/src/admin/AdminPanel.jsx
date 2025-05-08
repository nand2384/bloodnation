import React from "react";
import { Menu, X } from "lucide-react";
import Sidebar from "./Sidebar";

function AdminPanel() {
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
              Main Content
            </h1>
          </div>
          <div className="p-6 text-gray-800">
            <p>Details about website server uptime, users interaction, api calls, etcetra will be available here soon.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPanel;
