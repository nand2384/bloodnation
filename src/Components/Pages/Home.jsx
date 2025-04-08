import React from 'react'
import Navbar from '../Common/Navbar/Navbar'
import { Link } from 'react-router-dom'
function Home() {
  return (
    <>
        <Navbar />
        <section className=' h-[89vh] flex justify-center items-center bg-red-50'>
            <div className='w-2/3 h-2/4 flex flex-col justify-center items-center'>
                <h1 className=' text-center mb-10 text-4xl font-bold'>Welcome to Blood Nation!</h1>
                <p className=' text-center text-lg'>Blood Nation is a nationwide platform for those who need assistance related to Blood donation or for the ones who needs Blood.
                We are here to connect Donors and Recipient.</p>
                <div className=' flex justify-center items-center mt-10 w-24 h-14 shadow-lg bg-green-400 rounded-2xl hover:shadow-2xl hover:cursor-pointer'><Link to="/about">About Us</Link></div>
            </div>
        </section>
    </>
  )
}

export default Home
