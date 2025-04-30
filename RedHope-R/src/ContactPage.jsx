import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import axios from "axios";
import About from "./Container/About";
import Headder from "./Container/Headder";

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  // Handle form input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const response = await axios.post("http://localhost:5000/send-email", formData);

      if (response.data.success) {
        setStatus("✅ Email sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Clear form after successful submission
      } else {
        setStatus("❌ Failed to send email. Try again later.");
      }
    } catch (error) {
      setStatus("❌ Error sending email.");
      console.error("Error:", error);
    }

    // Clear status after 5 seconds
    setTimeout(() => setStatus(""), 5000);
  };

  return (
    <div>
      <Headder />
      <div className="contact-container">
        <div className="profile-section">
          <img src="../my-photo.jpg" alt="Profile" className="profile-pic" />
          <h2 className="name">Ganga Nageswararao junnu</h2>
          <p className="title">MERN Stack Developer</p>
        </div>

        <div className="social-icons">
          <a href="https://github.com/nagu-junnu" target="_blank" rel="noopener noreferrer">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/nagu-junnu-55019a216" target="_blank" rel="noopener noreferrer">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com/bunny_boyz_private" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="mailto:nagujunnu33@gmail.com">
            <FaEnvelope />
          </a>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder=" Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button className="btn" type="submit">Send Message</button>
        </form>

        {status && <p className="status-message">{status}</p>}
      </div>
      <About />
    </div>
  );
};

export default ContactPage;
