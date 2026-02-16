import React from 'react';
import './CopyrightsFooterSection.css';
import { useLanguage } from '../../../contexts/LanguageContext';
import { translations } from '../translations';

const CopyrightsFooterSection = () => {
  const { language } = useLanguage();
  const content = translations[language];

  return (
    <p className="copyright">{content.footerCopyright}</p>
  );
};

export default CopyrightsFooterSection;
