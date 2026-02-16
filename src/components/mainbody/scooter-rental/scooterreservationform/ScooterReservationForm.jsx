import React, { useState } from "react";
import "./ScooterReservationForm.css";
import { useLanguage } from "../../../../contexts/LanguageContext"; // Import language context
import { translations } from "./translations"; // Import translations

const ScooterReservationForm = () => {
  const { language } = useLanguage(); // Get the current language
  const content = translations[language]; // Get translated content

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    startDateTime: "",
    endDateTime: "",
    hasLicense: false,
    hasCarLicense: false,
    selectedScooter: "",
  });

  const [errors, setErrors] = useState({});
  const [formStatus, setFormStatus] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === "mobile") {
      // Only allow numbers in the mobile input
      if (!/^\d*$/.test(value)) return; 
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = content.errors.name;
    if (!formData.email.trim()) newErrors.email = content.errors.email;
    if (!formData.mobile.trim()) newErrors.mobile = content.errors.mobile;
    if (!formData.startDateTime) newErrors.startDateTime = content.errors.startDateTime;
    if (!formData.endDateTime) newErrors.endDateTime = content.errors.endDateTime;
    if (!formData.hasLicense) newErrors.hasLicense = content.errors.hasLicense;
    if (!formData.selectedScooter) newErrors.selectedScooter = content.errors.selectedScooter;

    // Ensure end datetime is after start datetime
    if (formData.startDateTime && formData.endDateTime) {
      const startDateTime = new Date(formData.startDateTime);
      const endDateTime = new Date(formData.endDateTime);
      if (endDateTime <= startDateTime) {
        newErrors.endDateTime = content.errors.invalidEndDate;
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus(content.sendingMessage);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setFormStatus(content.fixErrorsMessage);
    } else {
      try {
        const response = await fetch("/send_booking_email.php", {
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
            email: "",
            mobile: "",
            startDateTime: "",
            endDateTime: "",
            hasLicense: false,
            hasCarLicense: false,
            selectedScooter: "",
          });
          setErrors({});
        }
      } catch (error) {
        setFormStatus(content.errorMessage);
      }
    }
  };

  const currentDateTime = new Date().toISOString().slice(0, 16);

  return (
    <div className="scooter-reservation-form">
      <form className="reservation-form" onSubmit={handleSubmit}>
        <h2>{content.formTitle}</h2>

        <div className="form-group">
          <label>{content.fields.name}</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>{content.fields.email}</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>{content.fields.mobile}</label>
          <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} />
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>

        <div className="form-group">
          <label>{content.fields.startDateTime}</label>
          <input type="datetime-local" name="startDateTime" value={formData.startDateTime} onChange={handleChange} min={currentDateTime} />
          {errors.startDateTime && <span className="error">{errors.startDateTime}</span>}
        </div>

        <div className="form-group">
          <label>{content.fields.endDateTime}</label>
          <input type="datetime-local" name="endDateTime" value={formData.endDateTime} onChange={handleChange} min={formData.startDateTime || currentDateTime} />
          {errors.endDateTime && <span className="error">{errors.endDateTime}</span>}
        </div>

        <div className="form-group">
          <label>
            <input type="checkbox" name="hasLicense" checked={formData.hasLicense} onChange={handleChange} />
            {content.fields.hasLicense}
          </label>
          {errors.hasLicense && <span className="error">{errors.hasLicense}</span>}
        </div>

        <div className="form-group">
          <label>
            <input type="checkbox" name="hasCarLicense" checked={formData.hasCarLicense} onChange={handleChange} />
            {content.fields.hasCarLicense}
          </label>
        </div>

        <div className="form-group">
          <label>{content.fields.selectedScooter}</label>
          <select name="selectedScooter" value={formData.selectedScooter} onChange={handleChange}>
            <option value="">{content.fields.selectScooter}</option>
            <option value="Sym symphony 50cc">Sym symphony 50cc</option>
            <option value="Sym symphony 125cc">Sym symphony 125cc</option>
            <option value="Sym symphony 200cc">Sym symphony 200cc</option>
            <option value="Atv/Quad 450 cc">Atv/Quad 450 cc</option>
            <option value="Atv/Quad 450 Long">Atv/Quad 450 Long</option>
            <option value="Atv/Quad 520 Long">Atv/Quad 520 Long</option>
          </select>
          {errors.selectedScooter && <span className="error">{errors.selectedScooter}</span>}
        </div>

        <button type="submit">{content.fields.submit}</button>
        {formStatus && <p className="form-status">{formStatus}</p>}
      </form>
    </div>
  );
};

export default ScooterReservationForm;
