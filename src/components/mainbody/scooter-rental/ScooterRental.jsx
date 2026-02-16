import React from 'react';
import './ScooterRental.css';
import ScooterPreview from './scooter-preview/ScooterPreview';
import scooterContent from './scooterContent';
import InstructionsPreview from './instructions-preview/InstructionsPreview';

import { useLanguage } from '../../../contexts/LanguageContext';
import { translations } from './translations';

const ScooterRental = () => {
  const { language } = useLanguage();
  const content = translations[language]; // Get the content based on the selected language

  return (
    <div className="scooter-rental-page">
      <h1 className='title'>{content.pageTitle}</h1>
      <div className="scooter-preview-container">
        {scooterContent.map((scooter, index) => (
          <ScooterPreview key={index} scooter={scooter} />
        ))}
      </div>
      <InstructionsPreview />
     </div>
  );
};

export default ScooterRental;
