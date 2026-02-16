// src/components/ContactUs.js
import React from 'react';
import './ContactUs.css';

import GreetingMessage from "./greetingmessage/GreetingMessage";
import ContactInformations from './contactinformations/ContactInformations';
import ContactForm from './contactform/ContactForm';
import { useLanguage } from '../../../contexts/LanguageContext';
import { translations } from '../../../translations';  // Import translations

const ContactUs = () => {
  const { language } = useLanguage();  // Get the selected language
  const content = translations[language];  // Get the content for the selected language

  return (
    <div className="contact-us">
      <GreetingMessage content={content} />
      <div className="info-and-form-section">
        <ContactInformations content={content} />
        <ContactForm />
      </div>
    </div>
  );
};

export default ContactUs;
