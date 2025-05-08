import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

    const [email, setEmail] = useState("");
    const [emailErr, setEmailErr] = useState("");

    const [password, setPassword] = useState("");
    const [passwordErr, setPasswordErr] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const userStatus = sessionStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (userStatus) {
            navigate('/profile');
        } else if (token && !userStatus) {
            sessionStorage.setItem("user", true)
            navigate('/home')
        }
    }, [])


    useEffect(() => {
        if(email === "") {
            setEmailErr("");
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailErr("Please Enter a valid Email Address!");
        } else {
            setEmailErr("");
        }
    }, [email]);

    useEffect(() => {
        if(password === "") {
            setPasswordErr("");
        } else if (password.length < 6) {
            setPasswordErr("Your password should not be less than 6 characters.");
        } else {
            setPasswordErr("");
        }
    }, [password]);

     const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/user/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });
            const data = await response.json();
            const token = data.token;
            const Bool = data.Boolean;

            if(token) {
                localStorage.setItem("token", token);
                sessionStorage.setItem("user", true);
                navigate('/profile');
            } else if (Bool) {
                alert('Invalid Credentials!');
                setEmail('');
                setPassword('');
            }


        } catch (error) {
            console.log(error);            
        }
    }
  return (
    <>
        <section className=' h-screen bg-red-50 flex justify-center items-center'>
            <span className=' absolute text-2xl font-sans font-bold top-3 left-3 hover:underline'><Link to="/">&larr; Home</Link></span>
            <h1 className=' absolute top-20 font-extrabold font-sans text-4xl'>Donor Login</h1>
            <div className=' flex justify-center items-center h-1/2 w-1/3 bg-green-200/80 backdrop-saturate-150 backdrop-blur-md shadow-lg'>
                <form onSubmit={handleLogin} className=' flex flex-col justify-around h-4/5 w-2/3'>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder='Email' className=' p-2 rounded-2xl bg-white' />
                    {emailErr && <p className=' text-red-500 text-xs'>{emailErr}</p>}
                    <input type={showPassword? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='Password' className='p-2 rounded-2xl bg-white'/>
                    {passwordErr && <p className=' text-red-500 text-xs'>{passwordErr}</p>}
                    <div className='flex justify-between'>
                    <span>
                    <input type="checkbox" checked={showPassword} onChange={() => setShowPassword((prev) => !prev)} className=' self-center size-3'/><span className=' hover:cursor-default font-medium text-sm ml-2'>Show Password</span>
                    </span>
                    <span className='text-sm font-medium hover:text-blue-800 hover:underline'><Link>Forgot Password?</Link></span>
                    </div>
                    <button type='submit' className='w-30 h-10 self-center rounded-2xl bg-red-200 hover:shadow-xl hover:cursor-pointer hover:bg-red-300'>Login</button>
                    <span className='text-sm font-medium text-center'>Don't have an account? <span className='underline hover:text-red-600'><Link to="/register">Register</Link></span></span>
                </form>
            </div>
        </section>
    </>
  )
}

export default Login