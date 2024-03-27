import React from 'react';
import { Routes, Route } from "react-router-dom";
import MainRoutes from '../MainDashboard/Routes/MainRoute';
import MainScreen from '../MainDashboard/MainScreen';
import CustomerMain from '../CustomerDashboard/CustomerMain';
import SellerMain from '../SellerDashBoard/SellerMain';
const RouteMainFile = () => {
  return (
    <Routes>
      <Route path="/CustomerDashboard/*" element={<CustomerMain />} />
      <Route path="/SellerDashboard/*" element={<SellerMain/>} />
      <Route path="/*" element={<MainScreen/>} />

     
    </Routes>
  );
}

export default RouteMainFile;
