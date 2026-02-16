// src/components/ContactUs.js
import React from "react";
import "./ContactUs.css";

import GreetingMessage from "./greetingmessage/GreetingMessage";
import ContactInformations from "./contactinformations/ContactInformations";
import ContactForm from "./contactform/ContactForm";
import { useLanguage } from "../../../contexts/LanguageContext";
import { translations } from "../../../translations";

const ContactUs = () => {
  const { language } = useLanguage();
  const content = translations[language];

  return (
    <div className="contact-us">
      <GreetingMessage content={content} />
      <div className="info-and-form-section">
        <ContactInformations content={content} />
        <ContactForm />
      </div>

      {/* Full-Width Map Section */}
      <div className="map-wrapper">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d773.3311158360284!2d23.486163569630584!3d39.167343937994055!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a6e71c0d8d94eb%3A0x1400e6bd961b1d12!2sSkiathos%20Smart%20Ride%20Rentals!5e0!3m2!1sel!2sgr!4v1771229747811!5m2!1sel!2sgr"
          title="Location Map"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
