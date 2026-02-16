// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import {
  langNavMenuEN,
  langNavMenuGR,
  langNavMenuIT,
  langNavMenuGER
} from './langNavMenu';
import './Header.css';

import logo from "../../images/headerimages/logo.png";

const Header = () => {
  const { language, changeLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = React.useState(false);

  let menuItems;
  switch (language) {
    case 'GR':
      menuItems = langNavMenuGR;
      break;
    case 'IT':
      menuItems = langNavMenuIT;
      break;
    case 'GER':
      menuItems = langNavMenuGER;
      break;
    default:
      menuItems = langNavMenuEN;
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="header">
      <a href="/"  className="logo-container"  aria-label="Smart Ride Home">
        <div className="logo">
          <img src={logo} alt="Smart Ride Logo" className="logo-image" />
          <p className='logo-name'>Smart Ride</p>
        </div>
      </a>

      <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
        {menuItems.map((item, index) => (
          <Link key={index} to={getLinkPath(index)} onClick={closeMenu}>
            {item}
          </Link>
        ))}
      </nav>
      <div className="language-picker">
        <select onChange={(e) => changeLanguage(e.target.value)} value={language}>
          <option value="EN">English</option>
          <option value="GR">Greek</option>
          <option value="IT">Italian</option>
          <option value="GER">German</option>
        </select>
      </div>
      <div className={`burger ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </header>
  );
};

const getLinkPath = (index) => {
  switch (index) {
    case 0:
      return '/';
    case 1:
      return '/scooter-rentals';
    case 2:
      return '/about';
    case 3:
      return '/terms-and-conditions';
    case 4:
      return '/contact-us';
    default:
      return '/';
  }
};

export default Header;
