import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from '../Components/Pages/Home'
import About from '../Components/Pages/About';
import Login from '../Components/Pages/Login';

function AllRoutes() {
  return (
    <>
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/about' element={<About />}></Route>
            <Route path='/login' element={<Login />}></Route>
        </Routes>
    </>
  );
}

export default AllRoutes
