import React from 'react'
import {  Routes, Route } from "react-router-dom";
import HomeMain from '../Screens/HomeMain';
import AboutUs from '../../CustomerDashboard/Screens/About/AboutUs';
import Contactus from '../Screens/Contactus';

const MainRoutes = () => {
  console.log('Rendering RouteMainFile');

  return (

    <Routes>
        <Route path="/" element={<HomeMain/>} />
        <Route path="/MainDashboard/Home" element={<HomeMain/>} />
        <Route path="/MainDashboard/AboutUs" element={<AboutUs/>} />
        <Route path="/MainDashboard/Contactus" element={<Contactus/>} />
      </Routes>

 
  )
}

export default MainRoutes;



