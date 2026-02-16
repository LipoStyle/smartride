import React, { useEffect, useRef, useState } from "react";
import "./ContactForm.css";

import { useLanguage } from "../../../../contexts/LanguageContext"; // Import language context
import { translations } from "../../../../translations"; // Import translations

const ContactForm = () => {
  const { language } = useLanguage();
  const content = translations[language];

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState("");

  const formRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const observerOptions = { root: null, threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, observerOptions);

    if (formRef.current) observer.observe(formRef.current);
    if (titleRef.current) observer.observe(titleRef.current);

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus(content.submittingMessage || "Submitting...");

    try {
      const response = await fetch("/send_email.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData).toString(),
      });

      const result = await response.json();
      setFormStatus(result.message);

      if (result.status === "success") {
        setFormData({
          name: "",
          phone: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      setFormStatus("An error occurred. Please try again.");
    }
  };

  return (
    <div ref={formRef} className="form-container animate">
      <form onSubmit={handleSubmit}>
        <h2 ref={titleRef} className="form-title animate-title">
          {content.formTitle}
        </h2>

        <div className="form-group">
          <label htmlFor="name">{content.nameLabel}:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">{content.phoneLabel}:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">{content.emailLabel}:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">{content.messageLabel}:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <button type="submit">{content.submitButton}</button>
        {formStatus && <p className="form-status">{formStatus}</p>}
      </form>
    </div>
  );
};

export default ContactForm;
