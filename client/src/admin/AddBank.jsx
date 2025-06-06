import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

function AddBank() {
  const [bloodBankName, setBloodBankName] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNumber, setContactNumber] = useState();
  const [bankEmail, setBankEmail] = useState("");
  const [licenseNumber, setLicenseNumber] = useState();
  const [licenseValidity, setLicenseValidity] = useState();
  const [bloodBankCategory, setBloodBankCategory] = useState("");
  const [password, setPassword] = useState("");
  // const [licenseFile, setLicenseFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const status = sessionStorage.getItem("admin");

    if (status == null) {
      navigate("/admin");
    }
  }, []);

  // const handleFileChange = (e) => {
  //   setLicenseFile(e.target.files[0]);
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/admin/addBank', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          bloodBankName,
          state,
          city,
          address,
          contactPerson,
          contactNumber,
          bankEmail,
          licenseNumber,
          licenseValidity,
          bloodBankCategory,
          password
        })
      });

      const data = await response.json();
      const bankId = data.response;

      if (bankId) {
        navigator.clipboard.writeText(bankId);
        navigator.clipboard.writeText(password);
        alert(`Bank Id is ${bankId} and password - ${password}, both are copied to clipboard, just paste it!`);
        setBloodBankName('');
        setState('');
        setCity('');
        setAddress('');
        setContactPerson('');
        setContactNumber('');
        setBankEmail('');
        setLicenseNumber('');
        setLicenseValidity('');
        setBloodBankCategory('');
        setPassword('');
      }



    } catch (error) {
      console.log("Fetch Error", error);
    }
  }

  return (
    <>
      <div className=" flex h-screen">
        <Sidebar />
        <div className=" flex-1 bg-white">
          <div className="flex items-center justify-between p-4 border-b shadow">
            <h1 className="text-2xl font-semibold text-blue-900">
              Add Blood Bank
            </h1>
          </div>
          <form className="p-6 space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Blood Bank Name"
                className="border p-2 rounded w-full"
                value={bloodBankName}
                onChange={(e) => setBloodBankName(e.target.value)}
                required
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                className="border p-2 rounded w-full"
                value={state}
                onChange={(e) => setState(e.target.value)}
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                className="border p-2 rounded w-full"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Full Address (with PIN code)"
                className="border p-2 rounded w-full"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
              <input
                type="text"
                name="contactPerson"
                placeholder="Authorized Contact Person Name"
                className='border p-2 rounded w-full'
                value={contactPerson}
                onChange={(e) => setContactPerson(e.target.value)}
                required
              />
              <input
                type="tel"
                name="contactNumber"
                placeholder="Official Contact Number"
                className="border p-2 rounded w-full"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Official Email Address"
                className="border p-2 rounded w-full"
                value={bankEmail}
                onChange={(e) => setBankEmail(e.target.value)}
                required
              />
              <input
                type="text"
                name="licenseNumber"
                placeholder="License Number"
                className="border p-2 rounded w-full"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
                required
              />
              <input
                type="date"
                name="licenseValidity"
                placeholder="License Validity Date"
                value={licenseValidity}
                onChange={(e) => setLicenseValidity(e.target.value)}
                className="border p-2 rounded w-full"
                required
              />
              <select
                name="category"
                className="border p-2 rounded w-full"
                value={bloodBankCategory}
                onChange={(e) => setBloodBankCategory(e.target.value)}
                required
              >
                <option value="">Select Blood Bank Category</option>
                <option value="Government">Government</option>
                <option value="Private">Private</option>
                <option value="NGO">NGO</option>
                <option value="Hospital-based">Hospital-based</option>
              </select>
              <div className="col-span-1 md:col-span-2">
                <input
                  type="password"
                  name="password"
                  placeholder="Blood Bank Password"
                  className="border p-2 rounded w-full"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div> 
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800 cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default AddBank;
