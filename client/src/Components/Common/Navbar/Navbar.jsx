import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Droplet } from 'lucide-react';

function Navbar() {
  return (
    <nav className='fixed w-full top-4 z-50 px-4 transition-all duration-300'>
      <div className='max-w-7xl mx-auto glass-panel rounded-2xl px-6 lg:px-8'>
        <div className='flex justify-between h-16 items-center'>
          {/* Brand */}
          <Link to="/" className='flex items-center gap-3 group'>
            <div className='bg-red-50 p-2 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-sm border border-red-100'>
              <Droplet className='w-5 h-5 text-red-600' />
            </div>
            <span className='text-xl font-bold text-slate-900 tracking-widest uppercase'>
              Blood Nation
            </span>
          </Link>

          {/* Navigation Links */}
          <div className='hidden lg:flex items-center gap-8 font-semibold text-slate-600'>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `transition duration-200 hover:text-slate-900 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:-bottom-[6px] after:left-0 after:bg-red-500 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                  isActive ? "text-slate-900 after:scale-x-100 after:origin-bottom-left" : ""
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/bloodAvailability"
              className={({ isActive }) =>
                `transition duration-200 hover:text-slate-900 relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[2px] after:-bottom-[6px] after:left-0 after:bg-red-500 after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left ${
                  isActive ? "text-slate-900 after:scale-x-100 after:origin-bottom-left" : ""
                }`
              }
            >
              Find Blood
            </NavLink>
          </div>

          <div className='hidden lg:flex items-center gap-6'>
            <Link
              to="/bloodBankLogin"
              className='text-sm font-bold text-slate-600 hover:text-red-600 transition-colors'
            >
              Blood Bank Portal
            </Link>
            <Link
              to="/login"
              className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl font-bold transition-all duration-300 shadow-md transform hover:-translate-y-0.5 flex items-center justify-center'
            >
              User Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
