import React, { useEffect, useRef } from 'react';
import './ContactusFooterSection.css';
import { useLanguage } from '../../../contexts/LanguageContext';
import { translations } from '../translations';

const ContactusFooterSection = () => {
  const { language } = useLanguage();
  const content = translations[language];

  // Ref for animation
  const sectionRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      threshold: 0.2, // Trigger when 20% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, []);

  return (
    <div ref={sectionRef} className="contact-us-footer-section animate-section">
      <h3 className="animate-title">{content.contactUsTitle}</h3>
      <ul>
        <li className="animate-item">
          <p className="name">{content.contactUsMobile}:</p>
          <div className="items">
            <a href="tel:+306984260513" className="contact-link">+30 - 6984260513</a>
            <a href="tel:+306978218939" className="contact-link">+30 - 6978218939</a>
          </div>
        </li>
        <li className="animate-item">
          <p className="name">{content.contactUsEmail}:</p>
          <div className="items">
            <a href="mailto:skiathos.smartride@gmail.com" className="contact-link">skiathos.smartride@gmail.com</a>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ContactusFooterSection;
