import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LanguageProvider } from './contexts/LanguageContext';
import Header from './components/header/Header';
import Home from './components/mainbody/home/Home';
import ScooterRental from './components/mainbody/scooter-rental/ScooterRental';
import About from './components/mainbody/about/About';
import ContactUs from './components/mainbody/contact-us/ContactUs';
import Footer from './components/footer/Footer';
import "./App.css";
import ScooterReservationForm from './components/mainbody/scooter-rental/scooterreservationform/ScooterReservationForm';
import ScrollToTop from './contexts/ScrollToTop'; // Import the ScrollToTop component
import TermAndConditions from './components/mainbody/termandconditions/TermAndConditions';

const App = () => {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop /> {/* Add this here */}
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scooter-rentals" element={<ScooterRental />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/scooter-reservation-form" element={<ScooterReservationForm />} />
          <Route path="/terms-and-conditions" element={<TermAndConditions />} />
        </Routes>
        <Footer />
      </Router>
    </LanguageProvider>
  );
};

export default App;
