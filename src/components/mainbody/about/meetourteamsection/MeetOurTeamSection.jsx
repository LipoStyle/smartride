import React, { useEffect, useRef } from 'react';
import './MeetOurTeamSection.css';
import lorenco from "../../../../images/aboutimages/lorenco.jpg";
import maria from "../../../../images/aboutimages/maria.jpg";
import { useLanguage } from '../../../../contexts/LanguageContext';
import { translations } from '../translations';

const MeetOurTeamSection = () => {
  const { language } = useLanguage();
  const content = translations[language];

  // Refs for animations
  const sectionRef = useRef(null);
  const memberRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      root: null, // viewport
      threshold: 0.1, // Trigger animation when 20% of element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    // Observe team members
    if (sectionRef.current) observer.observe(sectionRef.current);
    memberRefs.current.forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className="meet-our-team animate-section">
      <div ref={(el) => (memberRefs.current[0] = el)} className="team-member animate">
        <div className="team-member-image">
          <img src={lorenco} alt={content.teamOwnerName} />
        </div>
        <div className="team-member-content">
          <h3>{content.teamOwnerName}</h3>
          <h4>{content.teamOwnerTitle}</h4>
          <p>{content.teamOwnerDescription}</p>
        </div>
      </div>

      <div ref={(el) => (memberRefs.current[1] = el)} className="team-member reverse animate">
        <div className="team-member-content">
          <h3>{content.teamCEOName}</h3>
          <h4>{content.teamCEOTitle}</h4>
          <p>{content.teamCEODescription}</p>
        </div>
        <div className="team-member-image">
          <img src={maria} alt={content.teamCEOName} />
        </div>
      </div>
    </div>
  );
};

export default MeetOurTeamSection;
