import React, { useEffect, useRef } from "react";
import "./SocialMediaFooterSection.css";

const SocialMediaFooterSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.2, // Trigger when 20% of element is visible
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
    <div ref={sectionRef} className="social-media-footer-section animate-section">
      <p className="white-background left"></p>
      <a href="https://www.facebook.com/profile.php?id=61555051207260&locale=el_GR">
        <i className="facebook"></i>
      </a>
      <a href="https://www.instagram.com/smart_ride_rentals/">
        <i className="instagram"></i>
      </a>
      <p className="white-background right"></p>
    </div>
  );
};

export default SocialMediaFooterSection;
