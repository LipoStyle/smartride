import React, { useEffect, useRef } from "react";
import "./FreeServicesFooterSection.css";
import { useLanguage } from "../../../contexts/LanguageContext";
import { translations } from "../translations";

const FreeServicesFooterSection = () => {
  const { language } = useLanguage();
  const content = translations[language];

  // Ref for Intersection Observer
  const sectionRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="free-services-footer-section animate-section">
      <h3>{content.freeServicesTitle}</h3>
      <ul>
        {content.freeServicesList.map((service, index) => (
          <li key={index} className="animate-item">{service}</li>
        ))}
      </ul>
    </div>
  );
};

export default FreeServicesFooterSection;
