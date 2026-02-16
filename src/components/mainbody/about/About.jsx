import React from 'react';
import OurStorySection from "./ourstorysection/OurStorySection";
import MeetOurTeamSection from './meetourteamsection/MeetOurTeamSection';
import BestRentalExperience from './bestrentalexpirence/BestRentalExperience';
import { useLanguage } from '../../../contexts/LanguageContext'; // Import the LanguageContext hook
import { translations } from './translations'; // Import the translations file
import "./About.css";

const About = () => {
  const { language } = useLanguage(); // Get the selected language from the context
  const content = translations[language]; // Fetch the translated content for the selected language

  return (
    <section className="about">
      <h1 className='title'>{content.aboutUsTitle}</h1>
      <OurStorySection />
      <h1 className='title-2'>{content.meetOurTeamTitle}</h1>
      <MeetOurTeamSection />
      <BestRentalExperience />
      <section className="call-to-action">
        <h2>{content.readyToRideTitle}</h2>
        <a href="/scooter-reservation-form" className="button">{content.bookScooterButton}</a>
      </section>
    </section>
  );
};

export default About;
