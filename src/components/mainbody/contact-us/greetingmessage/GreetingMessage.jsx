import React, { useEffect, useRef } from 'react';
import './GreetingMessage.css';

const GreetingMessage = ({ content }) => {
  // Refs for animations
  const titleRef = useRef(null);
  const textRef = useRef(null);

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

    if (titleRef.current) observer.observe(titleRef.current);
    if (textRef.current) observer.observe(textRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <h1 ref={titleRef} className="title animate-title">{content.greetingTitle}</h1>
      <p ref={textRef} className='quote-para animate-text'>{content.greetingText}</p>
    </>
  );
};

export default GreetingMessage;
