import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { scooterItems } from "./ScooterItems";
import { useLanguage } from "../../../../contexts/LanguageContext";
import { translations } from "../translations";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./FeaturedScooters.css";

const FeaturedScooters = () => {
  const { language } = useLanguage();
  const content = translations[language];

  // Refs for animations
  const titleRef = useRef(null);
  const sliderRef = useRef(null);

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

    // Observe title and slider
    if (titleRef.current) observer.observe(titleRef.current);
    if (sliderRef.current) observer.observe(sliderRef.current);

    return () => observer.disconnect(); // Cleanup observer on unmount
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1, dots: true } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1, dots: true } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1, dots: true } },
    ],
  };

  return (
    <section className="home-featured-scooters">
      <h2 ref={titleRef} className="featured-scooters-title animate-title">
        {content.featuredScootersTitle}
      </h2>
      <div ref={sliderRef} className="slider-container animate-slider">
        <Slider {...settings}>
          {scooterItems.map((item) => (
            <div className="scooter-card" key={item.id}>
              <img src={item.img} alt={item.title} className="scooter-img" />
              <div className="scooter-details">
                <h3>{item.title}</h3>
                <Link to={"/scooter-reservation-form"} className="button">
                  {content.rentNow}
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default FeaturedScooters;
