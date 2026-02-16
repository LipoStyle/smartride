// src/components/mainbody/Home.js
import React from 'react';
import "./Home.css"
import Hero from './herosection/Hero';
import HowItWorks from "./howitworkssection/HowItWorks"
import FeaturedScooters from './featuredscooterssection/FeaturedScooters';
import ContactHome from './contactsection/ContactHome';

const Home = () => {
  return (
    <div className='home'>
      <Hero />
      <HowItWorks />
      <FeaturedScooters />
      <ContactHome />
    </div>
  );
};

export default Home;
