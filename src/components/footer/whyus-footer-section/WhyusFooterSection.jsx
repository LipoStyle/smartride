import React, { useEffect, useRef } from "react";
import "./WhyusFooterSection.css";
import { useLanguage } from "../../../contexts/LanguageContext";
import { translations } from "../translations";

const WhyusFooterSection = () => {
  const { language } = useLanguage();
  const content = translations[language];

  // Ref for animation
  const sectionRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null, // Viewport
      threshold: 0.2, // Trigger when 20% of the element is visible
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
    <div ref={sectionRef} className="whyus-footer-section animate-section">
      <h3 className="animate-title">{content.whyUsTitle}</h3>
      <ul>
        {content.whyUsList.map((reason, index) => (
          <li key={index} className="animate-item">{reason}</li>
        ))}
      </ul>
    </div>
  );
};

export default WhyusFooterSection;
