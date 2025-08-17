import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { ROLES } from './utils/roles';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ResidentialServices from './pages/ResidentialServices';
import CommercialServices from './pages/CommercialServices';
import ServiceAreas from './pages/ServiceAreas';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import FreeEstimate from './pages/FreeEstimate';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Quoting from './pages/Quoting';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import Unauthorized from './pages/Unauthorized';
import SignUpTy from './components/SignUpTy';
import ThankYou from './pages/ThankYou';
import NowHiring from './pages/NowHiring';
import LeesburgHome from './pages/LeesburgHome';
import AshburnHome from './pages/AshburnHome';
import SterlingHome from './pages/SterlingHome';
import HerndonHome from './pages/HerndonHome';



function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <HelmetProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leesburg-window-cleaning" element={<LeesburgHome />} />
            <Route path="/ashburn-window-cleaning" element={<AshburnHome />} />
            <Route path="/sterling-window-cleaning" element={<SterlingHome />} />
            <Route path="/herndon-window-cleaning" element={<HerndonHome />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/residential" element={<ResidentialServices />} />
            <Route path="/services/commercial" element={<CommercialServices />} />
            <Route path="/service-areas" element={<ServiceAreas />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/free-estimate" element={<FreeEstimate />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="/signup-ty" element={<SignUpTy />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/now-hiring" element={<NowHiring />} />
            
            {/* Protected Routes */}
            <Route 
              path="/quote" 
              element={
                <ProtectedRoute allowedRoles={[ROLES.USER, ROLES.EMPLOYEE, ROLES.ADMIN]}>
                  <Quoting />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/jobs" 
              element={
                <ProtectedRoute allowedRoles={[ROLES.EMPLOYEE, ROLES.ADMIN]}>
                  <Jobs />
                </ProtectedRoute>
              } 
            />
          </Routes>
          </HelmetProvider>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;