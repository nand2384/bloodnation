import React, { useState, useEffect } from 'react';
import LoggedNavbar from '../Common/Navbar/LoggedNavbar';
import { useNavigate } from 'react-router-dom';

function Profile() {  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [email, setEmail] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {

      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await fetch('http://localhost:3000/api/verify/user', {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          });

          const responseJSON = await response.json();
          const data = responseJSON.response;

          if (data) {
            console.log(data);
            setFirstName(data.firstName);
            setLastName(data.lastName);
            setFatherName(data.fatherName);
            setGender(data.gender);
            setAge(data.age);
            setBloodGroup(data.bloodGroup);
            setEmail(data.email);
          } else {
            navigate('/login');
            localStorage.clear();
          }

        } catch (error) {
          console.log("Fetching /api/verify/user Error: ", error);
          navigate('/home')
          localStorage.clear();
          sessionStorage.clear();
        }
      } else {
        localStorage.clear();
        navigate('/home');
      }
    }

    verifyUser();
    }, []);

    useEffect(() => {
      if (newPassword !== confirmNewPassword) {
        setPasswordError("New Password didn't match!");
      } else {
        setPasswordError("");
      }
    }, [oldPassword, newPassword, confirmNewPassword])


    const handleChangePassword =  async () => {
      try {
        const response = await fetch('http://localhost:3000/api/changePassword', {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: email,
            oldPassword: oldPassword,
            newPassword: newPassword
          })
        })
        
      const data = await response.json();
      const message = data.message;

      alert(message);

      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');

      } catch (error) {
        console.log("Fetch Error: ", error);
      }
    }

  return (
    <>
      <LoggedNavbar />
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
              Your Details
            </h2>
            <div className="flex flex-col gap-3 text-gray-700 text-base">
              <div className="flex justify-between">
                <span className="font-medium">First Name:</span>
                <span>{firstName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Last Name:</span>
                <span>{lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Father's Name:</span>
                <span>{fatherName}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Gender:</span>
                <span>{gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Age:</span>
                <span>{age}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Blood Group:</span>
                <span>{bloodGroup}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Email:</span>
                <span>{email}</span>
              </div>
            </div>
          </div>

          {/* Additional Details Card */}
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold text-red-600 mb-4 text-center border-b-2 border-red-400 pb-2">
              Additional Details
            </h2>
            <div className="flex flex-col gap-4 items-center">
              <input
                type="text"
                placeholder="Address"
                className="border p-2 rounded-md w-full"
              />
              <input
                type="text"
                placeholder="City"
                className="border p-2 rounded-md w-full"
              />
              <input
                type="text"
                placeholder="State"
                className="border p-2 rounded-md w-full"
              />
              <input
                type="text"
                placeholder="Pincode"
                className="border p-2 rounded-md w-full"
              />
              <button className='p-2 w-1/4 bg-red-300 rounded-2xl shadow-sm shadow-black/20 hover:bg-red-400 hover:shadow-md cursor-pointer'>Update</button>
            </div>
            <h2 className="text-xl font-semibold text-red-600 mt-4 mb-4 text-center border-t-2 border-b-2 border-red-400 pt-2 pb-2">
              Change Password
            </h2>
            <div className="flex flex-col items-center gap-3 text-gray-700 text-base">
              <input type="text" value={oldPassword} placeholder='Old Password' onChange={(e) => setOldPassword(e.target.value)} className='border p-2 rounded-md w-full'/>
              <input type="text" value={newPassword} placeholder='New Password' onChange={(e) => setNewPassword(e.target.value)} className='border p-2 rounded-md w-full'/>
              <input type="text" value={confirmNewPassword} placeholder='Confirm New Password' onChange={(e) => setConfirmNewPassword(e.target.value)} className='border p-2 rounded-md w-full'/>
              {passwordError && <p className=' text-red-500 text-xs'>{passwordError}</p>}
              <button onClick={handleChangePassword} className='p-2 w-1/4 bg-red-300 rounded-2xl shadow-sm shadow-black/20 hover:bg-red-400 hover:shadow-md cursor-pointer'>Change</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
