import React from 'react';
import './Footer.css';

import SocialMediaFooterSection from './social-media-footer-section/SocialMediaFooterSection';
import CopyrightsFooterSection from './copyrights-footer-section/CopyrightsFooterSection';
import ContactusFooterSection from './contactus-footer-section/ContactusFooterSection';
import WhyusFooterSection from './whyus-footer-section/WhyusFooterSection';
import FreeServicesFooterSection from './freeservicesfootersection/FreeServicesFooterSection';

const Footer = () => {
  return (
    <footer className="footer">
      <div className='links-and-informations'>
        <ContactusFooterSection />
        <WhyusFooterSection />
        <FreeServicesFooterSection />
      </div>
      <div className='social-and-copyrights'>
        <SocialMediaFooterSection />
        <CopyrightsFooterSection />
      </div>
    </footer>
  );
};

export default Footer;
