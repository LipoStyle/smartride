import React, { useEffect, useRef } from "react";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { translations } from "../translations";
import "./ContactHome.css";

import phone from "../../../../images/home/phone.png";
import email from "../../../../images/home/email.png";
import facebook from "../../../../images/home/facebook.png";
import instagram from "../../../../images/home/instagram.png";

const ContactHome = () => {
  const { language } = useLanguage();
  const content = translations[language]; // Get the content for the selected language

  // Refs for animations
  const titleRef = useRef(null);
  const paraRef = useRef(null);
  const methodsRef = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      threshold: 0.2, // Trigger when 20% of element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Observe title, paragraph, and each method
    if (titleRef.current) observer.observe(titleRef.current);
    if (paraRef.current) observer.observe(paraRef.current);
    methodsRef.current.forEach((method) => {
      if (method) observer.observe(method);
    });

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, []);

  return (
    <section className="contact-section">
      <h2 ref={titleRef} className="contact-section-title animate-title">
        {content.contactHomeTitle}
      </h2>
      <p ref={paraRef} className="contact-section-para animate-para">
        {content.contactHomeDescription}
      </p>
      <div className="contact-methods">
        <a href="tel:+306984260513" className="method animate-method" ref={(el) => (methodsRef.current[0] = el)}>
          <img src={phone} alt="phone" />
          <div className="numbers">
            <p>+30 - 6984260513</p>
            <p>+30 - 6978218939</p>
          </div>
        </a>
        <a href="mailto:skiathos.smartride@gmail.com" className="method animate-method" ref={(el) => (methodsRef.current[1] = el)}>
          <img src={email} alt="email" />
          <h3>skiathos.smartride@gmail.com</h3>
        </a>
        <a href="https://www.facebook.com/profile.php?id=61555051207260&locale=el_GR" target="_blank" rel="noopener noreferrer" className="method animate-method" ref={(el) => (methodsRef.current[2] = el)}>
          <img src={facebook} alt="facebook" />
          <h3>Smart Ride</h3>
        </a>
        <a href="https://www.instagram.com/smart_ride_rentals/" target="_blank" rel="noopener noreferrer" className="method animate-method" ref={(el) => (methodsRef.current[3] = el)}>
          <img src={instagram} alt="instagram" />
          <h3>Smart Ride</h3>
        </a>
      </div>
    </section>
  );
};

export default ContactHome;
