import React from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import DashboardPage from "../pages/DashboardPage";
import AddAccountPage from '../pages/AddAccountPage';
import MarketplacePage from '../pages/MarketplacePage';
import Navbar from "../components/Navbar"; 

const AppRoutes = () => {
  const location = useLocation();
  
  return (
    <>
      {/* Don't show Navbar on l\ogin page */}
      {location.pathname !== '/login' && <Navbar />}
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tambah-akun" element={<AddAccountPage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;