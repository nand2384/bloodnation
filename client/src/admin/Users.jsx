import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const status = sessionStorage.getItem("admin");

    if (status == null) {
      navigate("/admin");
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/admin/fetchUsers", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const result = await response.json();
        setUsers(result);
      } catch (error) {
        console.log("Fetch Error: ", error);
      }
    };
    fetchUsers();
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
              Users Details
            </h1>
          </div>
          <div className="p-6 text-gray-800">
            {/* Table comes here */}
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse border border-gray-300">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className="px-4 py-2 border">First Name</th>
                    <th className="px-4 py-2 border">Last Name</th>
                    <th className="px-4 py-2 border">Father Name</th>
                    <th className="px-4 py-2 border">Age</th>
                    <th className="px-4 py-2 border">Gender</th>
                    <th className="px-4 py-2 border">Blood Group</th>
                    <th className="px-4 py-2 border">Email</th>
                    <th className="px-4 py-2 border">Password</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id || index} className="border-t">
                      <td className="px-4 py-2 border">{user.firstName}</td>
                      <td className="px-4 py-2 border">{user.lastName}</td>
                      <td className="px-4 py-2 border">{user.fatherName}</td>
                      <td className="px-4 py-2 border">{user.age}</td>
                      <td className="px-4 py-2 border">{user.gender}</td>
                      <td className="px-4 py-2 border">{user.bloodGroup}</td>
                      <td className="px-4 py-2 border">{user.email}</td>
                      <td className="px-4 py-2 border">{user.password}</td>
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

export default Users;
