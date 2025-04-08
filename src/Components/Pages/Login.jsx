import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);


     const handleLogin = (e) => {
        e.preventDefault();
        console.log(email);
        console.log(password);
     }
  return (
    <>
        <section className=' h-screen bg-red-50 flex justify-center items-center'>
            <span className=' absolute text-2xl font-sans font-bold top-3 left-3'><Link to="/">&larr; Home</Link></span>
            <h1 className=' absolute top-20 font-extrabold underline font-sans text-4xl'>Login</h1>
            <div className=' flex justify-center items-center h-1/2 w-1/3 bg-green-200/80 backdrop-saturate-150 backdrop-blur-md shadow-lg'>
                <form onSubmit={handleLogin} className=' flex flex-col justify-around h-3/4 w-2/3'>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Email' className=' p-2 rounded-2xl bg-white' />
                    <input type={showPassword? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='Password' className='p-2 rounded-2xl bg-white'/>

                    <div className='flex justify-between'>
                    <span>
                    <input type="checkbox" checked={showPassword} onChange={() => setShowPassword((prev) => !prev)} className=' self-center size-3'/><span className=' font-medium text-sm ml-2'>Show Password</span>
                    </span>
                    <span className='text-sm font-medium'><Link>Forgot Password?</Link></span>
                    </div>
                    <button type='submit' className='w-30 h-10 mt-2 self-center rounded-2xl bg-red-200 hover:shadow-xl hover:cursor-pointer hover:bg-red-300'>Submit</button>
                </form>
            </div>
        </section>
    </>
  )
}

export default Login