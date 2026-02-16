import React, { useEffect, useRef } from "react";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { translations } from "../translations";
import "./InstructionsPreview.css";

const InstructionsPreview = () => {
  const { language } = useLanguage();
  const content = translations[language];

  // Refs for animations
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const stepRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      threshold: 0.2, // Trigger when 20% of element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Stop observing once visible
        }
      });
    }, observerOptions);

    // Observe elements
    if (sectionRef.current) observer.observe(sectionRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    if (descriptionRef.current) observer.observe(descriptionRef.current);
    stepRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, []);

  return (
    <div ref={sectionRef} className="instructions-section animate-section">
      <h3 ref={titleRef} className="animate-title">{content.instructionsTitle}</h3>
      <p ref={descriptionRef} className="animate-description">{content.instructionsDescription}</p>
      <ul>
        {[content.step1, content.step2, content.step3, content.step4, content.step5].map((step, index) => (
          <li ref={(el) => (stepRefs.current[index] = el)} className="animate-step" key={index}>
            <div className="step-background"></div>
            <div className="number-count">
              <p>{index + 1}</p>
              <p className="content-step">{step}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InstructionsPreview;
