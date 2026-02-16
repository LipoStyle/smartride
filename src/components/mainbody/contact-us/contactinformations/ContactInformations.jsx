import React, { useEffect, useRef } from 'react';
import './ContactInformations.css';

import locationIcon from "../../../../images/contactus/location.svg";
import emailIcon from "../../../../images/contactus/email.svg";
import phoneIcon1 from "../../../../images/contactus/whatsapp.svg";
import phoneIcon2 from "../../../../images/contactus/viber.svg";

import { useLanguage } from '../../../../contexts/LanguageContext';
import { translations } from '../../../../translations';

const ContactInformations = () => {
  const { language } = useLanguage();
  const content = translations[language];

  // Refs for animation
  const sectionRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      threshold: 0.2, // Trigger animation when 20% of element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    if (sectionRef.current) observer.observe(sectionRef.current);
    elementsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="contact-info animate-section">
      <div className='text-of-contact-info'>
        <h2 ref={(el) => (elementsRef.current[0] = el)} className="animate-element">
          {content.contactTitle}
        </h2>
        <p ref={(el) => (elementsRef.current[1] = el)} className='contact-info-para animate-element'>
          {content.contactText}
        </p>
        <hr />
      </div>

      <div className='contact-info-pairs-section'>
        {[
          { icon: locationIcon, title: content.addressTitle, text: content.address, isAddress: true },
          { icon: phoneIcon1, title: "Whatsapp", text: content.whatsapp, text2: content.viber },
          { icon: phoneIcon2, title: "Viber", text: content.viber, text2: content.whatsapp },
          { icon: emailIcon, title: content.emailTitle, text: content.email },
        ].map((item, index) => (
          <div key={index} ref={(el) => (elementsRef.current[index + 2] = el)} className='contact-info-pairs animate-element'>
            <img src={item.icon} alt={item.title} />
            <div className='pairs-text'>
              <h3>{item.title}</h3>
              {item.isAddress ? (
                <p>{item.text}</p> // Address is NOT clickable
              ) : (
                <>
                  <p>
                    {item.text.includes("@") ? (
                      <a href={`mailto:${item.text}`} className="clickable">{item.text}</a>
                    ) : (
                      <a href={`tel:${item.text}`} className="clickable">{item.text}</a>
                    )}
                  </p>
                  {item.text2 && (
                    <p>
                      <a href={`tel:${item.text2}`} className="clickable">{item.text2}</a>
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className='social-media-section'>
        <hr />
        <h3>{content.followUs}</h3>
        <div className='social-icons'>
          <a href="https://www.facebook.com/profile.php?id=61555051207260&locale=el_GR"><span className='facebook'></span></a>
          <a href="https://www.instagram.com/smart_ride_rentals/"><span className='instagram'></span></a>
        </div>
      </div>
    </div>
  );
};

export default ContactInformations;
