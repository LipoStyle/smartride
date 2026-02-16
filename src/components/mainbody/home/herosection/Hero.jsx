import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import "./Hero.css";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { translations } from "../translations";

const Hero = () => {
  const { language } = useLanguage();
  const content = translations[language];

  // Refs for animations
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const elements = [titleRef.current, descriptionRef.current, buttonRef.current];

    elements.forEach((el, index) => {
      if (el) {
        setTimeout(() => {
          el.classList.add("visible");
        }, index * 300); // Delay each element by 300ms
      }
    });
  }, []);

  return (
    <section className="hero">
      <div className="hero-background"></div>
      <div className="hero-content">
        <h1 ref={titleRef} className="hero-title">{content.heroTitle}</h1>
        <p ref={descriptionRef} className="hero-description">{content.heroDescription}</p>
        <Link ref={buttonRef} to={"./scooter-reservation-form"} className="hero-button">
          {content.heroRentNow}
        </Link>
      </div>
    </section>
  );
};

export default Hero;
