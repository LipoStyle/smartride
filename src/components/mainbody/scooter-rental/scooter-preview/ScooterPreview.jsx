import React, { useEffect, useRef } from "react";
import "./ScooterPreview.css";
import { Link } from "react-router-dom";

const ScooterPreview = ({ scooter }) => {
  // Refs for animations
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const buttonRef = useRef(null);

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

    // Observe elements
    if (cardRef.current) observer.observe(cardRef.current);
    if (titleRef.current) observer.observe(titleRef.current);
    if (buttonRef.current) observer.observe(buttonRef.current);

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, []);

  return (
    <div ref={cardRef} className="scooter-preview animate-preview">
      <div className="scooter-image">
        <img src={scooter.images} alt={scooter.title} />
      </div>
      <h3 ref={titleRef} className="scooter-title animate-title">
        {scooter.title}
      </h3>
      <Link
        ref={buttonRef}
        to={"/scooter-reservation-form"}
        className="button animate-button"
      >
        Rent Now
      </Link>
    </div>
  );
};

export default ScooterPreview;
