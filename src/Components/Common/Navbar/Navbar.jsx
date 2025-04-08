import React from 'react'
import { NavLink, Link } from 'react-router-dom'

function Navbar() {
    
  return (
    <>
        <nav className='flex h-[11vh] bg-red-300 justify-between items-center text-xl shadow-sm border-b-4 border-green-400 sticky top-0'>
            <div className=' ml-10 font-bold '>
                <span><Link to="/">Blood Nation</Link></span>
            </div>
            <div className='flex justify-between w-4xl mr-6 font-sans'>
                    <span><NavLink to="/" className={({ isActive }) => ` p-1 ${isActive? " underline" : ""}  `}>Home</NavLink></span>
                    <span><NavLink to="/bloodAvailability" className={({ isActive }) => ` p-1 ${isActive? " underline" : ""}  `}>Blood Availability</NavLink></span>
                    <span><NavLink to="/donateBlood" className={({ isActive }) => ` p-1 ${isActive? " underline" : ""}  `}>Want to donate Blood?</NavLink></span>
                    <span><NavLink to="/login" className={({ isActive }) => ` p-1 ${isActive? " underline" : ""}  `}>User Login</NavLink></span>
                    <span><NavLink to="/bloodBankLogin" className={({ isActive }) => ` p-1 ${isActive? " underline" : ""}  `}>Blood Bank Login</NavLink></span>
            </div>
        </nav>
    </>
  )
}

export default Navbar
