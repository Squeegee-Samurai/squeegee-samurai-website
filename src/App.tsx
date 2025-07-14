import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ResidentialServices from './pages/ResidentialServices';
import CommercialServices from './pages/CommercialServices';
import ServiceAreas from './pages/ServiceAreas';
import Gallery from './pages/Gallery';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import FreeEstimate from './pages/FreeEstimate';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/residential" element={<ResidentialServices />} />
            <Route path="/services/commercial" element={<CommercialServices />} />
            <Route path="/service-areas" element={<ServiceAreas />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/free-estimate" element={<FreeEstimate />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;