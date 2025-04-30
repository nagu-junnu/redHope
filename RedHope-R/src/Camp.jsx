import React, { useState, useEffect } from "react";
import Slides from "./Container/Slides";
import Headder from './Container/Headder';
import About from './Container/About';
import axios from 'axios';

const Camp = () => {
  const [showForm, setShowForm] = useState(false);
  const [camps, setCamps] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [showMenu, setShowMenu] = useState(null); // Track open menu

  useEffect(() => {
    const fetchCamps = async () => {
      try {
        const response = await axios.get("http://localhost:5000/camps");
        setCamps(response.data);
      } catch (error) {
        console.error("Error fetching camps:", error);
      }
    };
    fetchCamps();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/camps", { name, date, contact, location, description });
      setName("");
      setDate("");
      setDescription("");
      setContact("");
      setLocation("");
      setShowForm(false); // Close popup after submission
    } catch (error) {
      console.error("Error adding camp:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/camps/${id}`);
      setCamps(camps.filter((camp) => camp._id !== id)); // Remove from frontend
    } catch (error) {
      console.error("Error deleting camp:", error);
    }
  };
  const handleNavigate = () => {
    navigate("./Donate"); // Navigate to the /donations page
  };

  return (
    <div>
      <Headder />
      {/* <div className="body"></div> */}
      <div className="body-sub-2">
        <div className="body-title">
          <h1>Camps</h1>
          <div className="heart"></div>
        </div>
        <div className="border1"></div>
          <div className="camp-main">
        <div className='aside'>
          <div className="floating-button" onClick={() => setShowForm(true)}>
            <span className="plus-icon">+</span>
            <span className="text">Conduct Camp</span>
          </div>
        </div>
        
      {/* Display Camps */}
      <div className="camp-container">
        {camps.map((camp) => (
          <div key={camp._id} className="camp-card">
            {/* Three Dots Menu */}
            <div className="menu-container">
              <span className="menu-dots" onClick={() => setShowMenu(showMenu === camp._id ? null : camp._id)}>⋮</span>
              {showMenu === camp._id && (
                <div className="menu-options">
                  <p onClick={() => handleDelete(camp._id)}>Delete</p>
                </div>
              )}
            </div>

            <h3>{camp.name}</h3>
            <p>📅 {camp.date}</p>
            <p>📍 {camp.location}</p>
            <p>📞 {camp.contact}</p>
            <p><span>Note:</span>{camp.description}</p>
            <a href="./Donate" className="btn nnn"> Register</a>
          </div>
        ))}
      </div>
      </div>
      {/* Popup Form */}
      {showForm && (
        <div className="popup-overlay" onClick={() => setShowForm(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>Fill Camp Details</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <input type="text" placeholder="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} required />
              <input type="text" placeholder="Address" value={location} onChange={(e) => setLocation(e.target.value)} required />
              <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              <textarea 
                placeholder="About The Camp" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                required 
              />
              <button className="btn" type="submit">Submit</button>
              <button className="btn" type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
       </div>
       
       <div>
       <div className="slide-con">
        <h4>Previous Camps: </h4>
      <Slides />
      </div>
    </div>
      <About />
    </div>
  );
};

export default Camp;
