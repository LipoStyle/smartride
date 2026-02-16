import React, { useEffect, useRef } from "react";
import "./HowItWorks.css";
import img1 from "../../../../images/home/scouter1.jpg";
import img2 from "../../../../images/home/scouter2.jpg";
import img3 from "../../../../images/home/scouters.jpg";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { translations } from "../translations";

const HowItWorks = () => {
  const { language } = useLanguage();
  const content = translations[language];

  // References for animations
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);

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

    // Observe title and each step
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    stepsRef.current.forEach((step) => {
      if (step) observer.observe(step);
    });

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, []);

  return (
    <section className="how-it-works">
      <h2 ref={sectionRef} className="animate-title">{content.howItWorksTitle}</h2>
      <div className="steps">
        {content.howItWorksSteps.map((step, index) => (
          <div 
            className="step animate-step" 
            key={index} 
            ref={(el) => (stepsRef.current[index] = el)}
          >
            <img src={index === 0 ? img1 : index === 1 ? img2 : img3} alt={`Step ${index + 1}`} />
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
