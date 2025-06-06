import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoggedNavbar from "../Common/Navbar/LoggedNavbar";
import LoggedBankNavbar from "../Common/Navbar/LoggedBankNavbar";

function BloodBankProfile() {
  const navigate = useNavigate();

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

  useEffect(() => {
    const verifyUser = async () => {
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
            console.log("Blood Bank verify data: ", data);
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
        }
      } else {
        localStorage.clear();
        sessionStorage.clear();
        navigate("/home");
      }
    };

    verifyUser();
  }, []);

  return (
    <>
      <LoggedBankNavbar />
      <section className="min-h-[89vh] bg-red-50">
        {/* Dashboard Header */}
        <div className="flex justify-center items-center pt-8 pb-6 bg-white shadow-md">
          <span className="font-bold text-3xl text-gray-800 tracking-wide border-b-4 border-red-400 pb-1">
            DASHBOARD
          </span>
        </div>

        {/* Profile Details Section */}
        <div className="flex justify-center items-start gap-10 px-6 py-10 flex-wrap">
          {/* Your Details Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold text-red-600 mb-4 text-center border-b-2 border-red-400 pb-2">
              Bank Details
            </h2>
            <div className="flex flex-col gap-3 text-gray-700 text-base">
              <div className="flex justify-between">
                <span className="font-medium">Blood Bank Name:</span>
                <span>{bloodBankName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Bank ID:</span>
                <span>{bankId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Email:</span>
                <span>{bankEmail}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Blood Bank Category:</span>
                <span>{bloodBankCategory}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">License Number:</span>
                <span>{licenseNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">License Validity:</span>
                <span>{licenseValidity}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Contact Person:</span>
                <span>{contactPerson}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Contact Number:</span>
                <span>{contactNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Address:</span>
                <span>{address}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">State:</span>
                <span>{state}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">City:</span>
                <span>{city}</span>
              </div>
            </div>
          </div>

          {/* Additional Details Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold text-red-600 mb-4 text-center border-b-2 border-red-400 pb-2">
              Additional Details
            </h2>
          </div>
        </div>
      </section>
    </>
  );
}

export default BloodBankProfile;
