import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const status = sessionStorage.getItem("admin");
    if (status == null) {
      navigate("/admin");
    }
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <>
    {loading && (
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-blue-200/30">
        <div className="flex flex-col items-center justify-center bg-white/30 p-8 rounded-2xl shadow-2xl border border-white/40 backdrop-blur-lg">
          <div className="w-10 h-10 border-4 border-t-transparent border-blue-400 rounded-full animate-spin"></div>
        </div>
      </div>
      )}
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 bg-white overflow-auto">
        <div className="flex items-center justify-between p-4 border-b shadow">
          <h1 className="text-2xl font-semibold text-blue-900">
            Users Details
          </h1>
        </div>

        <div className="p-6 text-gray-800">
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
