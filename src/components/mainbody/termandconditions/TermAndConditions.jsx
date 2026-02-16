import React, { useEffect, useRef } from "react";
import "./TermAndConditions.css";

import { useLanguage } from '../../../contexts/LanguageContext';
import { translations } from './translations';

const TermAndConditions = () => {
  const { language } = useLanguage();
  const content = translations[language];

  // Refs for animation
  const titleRef = useRef(null);
  const listItemsRef = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.2, // Trigger animation when 20% of element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Observe title and list items
    if (titleRef.current) observer.observe(titleRef.current);
    listItemsRef.current.forEach((item) => {
      if (item) observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="terms-and-conditions">
      <div className="container">
        <h1 ref={titleRef} className="terms-title animate-title">
          {content.title}
        </h1>
        <ul className="terms-list">
          {[
            content.age_requirement,
            content.booking_length,
            content.helmets,
            content.police_fines,
            content.insurance_assistance,
            content.accident_damage,
            content.fuel_return,
            content.deposit,
            content.unlimited_mileage,
            content.additional_driver,
            content.rates,
            content.after_hours
          ].map((text, index) => (
            <li
              key={index}
              ref={(el) => (listItemsRef.current[index] = el)}
              className="animate-list"
            >
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TermAndConditions;
