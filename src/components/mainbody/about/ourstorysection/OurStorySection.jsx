import React, { useEffect, useRef } from "react";
import "./OurStorySection.css";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { translations } from "../translations";

import img1 from "../../../../images/aboutimages/1.jpg";
import img2 from "../../../../images/aboutimages/2.webp";
import img3 from "../../../../images/aboutimages/3.jpg";
import img4 from "../../../../images/aboutimages/4.jpg";

const OurStorySection = () => {
  const { language } = useLanguage();
  const content = translations[language];

  // Refs for animations
  const sectionRef = useRef(null);
  const textRefs = useRef([]);
  const imageRefs = useRef([]);

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

    // Observe images and text elements
    if (sectionRef.current) observer.observe(sectionRef.current);
    textRefs.current.forEach((el) => el && observer.observe(el));
    imageRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="about-section animate-section">
      <div className="images-container">
        <div className="image-grid">
          {[img1, img2, img3, img4].map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Our story image ${index + 1}`}
              className={`grid-image image${index + 1} animate`}
              ref={(el) => (imageRefs.current[index] = el)}
            />
          ))}
        </div>
      </div>
      <div className="text-container">
        <h3 ref={(el) => (textRefs.current[0] = el)} className="animate">
          {content.ourShortStory}
        </h3>
        <h2 ref={(el) => (textRefs.current[1] = el)} className="animate">
          {content.professionalsDedicated}
        </h2>
        <p ref={(el) => (textRefs.current[2] = el)} className="animate">
          {content.storyText1}
        </p>
        <p ref={(el) => (textRefs.current[3] = el)} className="animate">
          {content.storyText2}
        </p>
      </div>
    </div>
  );
};

export default OurStorySection;
