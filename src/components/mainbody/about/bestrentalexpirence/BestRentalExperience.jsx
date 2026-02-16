import React, { useEffect, useRef } from 'react';
import './BestRentalExperience.css';
import img from "../../../../images/aboutimages/3.jpg";
import { useLanguage } from '../../../../contexts/LanguageContext';
import { translations } from './translations';

const BestRentalExperience = () => {
  const { language } = useLanguage();
  const content = translations[language];

  // Refs for animations
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const servicesRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      threshold: 0.2, // Trigger animation when 20% of element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Observe elements
    if (sectionRef.current) observer.observe(sectionRef.current);
    if (contentRef.current) observer.observe(contentRef.current);
    if (servicesRef.current) observer.observe(servicesRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="rental-experience animate-section">
      <div ref={contentRef} className="content-container animate">
        <div className="image-section">
          <img src={img} alt="Woman on a scooter" />
        </div>
        <div className="text-section">
          <h2>{content.bestRentalTitle}</h2>
          <p>{content.bestRentalText1}</p>
          <p>{content.bestRentalText2}</p>
        </div>
      </div>
      <div ref={servicesRef} className="services-section animate">
        <div className="service-card">
          <h4>{content.premiumRentalServices}</h4>
          <ul>
            {content.servicesList.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
        </div>
        <div className="service-card">
          <h4>{content.conditions}</h4>
          <ul>
            {content.conditionsList.map((condition, index) => (
              <li key={index}>{condition}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BestRentalExperience;
