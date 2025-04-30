import React, { useState, useEffect } from "react";
import Headder from "./Container/Headder";
import About from "./Container/About";
import axios from "axios";

const Need = () => {
  const [showForm, setShowForm] = useState(false);
  const [menuVisible, setMenuVisible] = useState(null);
  const [needs, setNeeds] = useState([]);
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const response = await axios.get("http://localhost:5000/needs");
        setNeeds(response.data);
      } catch (error) {
        console.error("Error fetching needs:", error);
      }
    };
    fetchNeeds();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/needs/${id}`);
      setNeeds(needs.filter((need) => need._id !== id));
      setMenuVisible(null); // Close menu after deletion
    } catch (error) {
      console.error("Error deleting need request:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/needs", { name, group, contact, location });
      // alert("Need request added!");

      setShowForm(false); // Close popup after submission
      setName("");
    setGroup("");
    setContact("");
    setLocation("");
    } catch (error) {
      console.error("Error adding need request:", error);
    }
  };

  return (
    <div>
      <Headder />
      {/* <div className="body"></div> */}
        <div className="body-sub-1">
          <div className="body-title">
            <h1>Need</h1>
            <div className="heart"></div>
          </div>
          <div className="border1"></div>
           
            
          
        
      


      <div className="donor-container">


      <div className="add-button" onClick={() => setShowForm(true)}>
              <div className="child-1">
                <h3>Fill Details</h3>
              </div>
              <div className="child-2">
                <div className="center">
                  <span style={{ color: "black", fontSize: "24px" }}>+</span>
                </div>
              </div>
            </div>




        {needs.map((need) => (
          <div key={need._id} className="donor-card">
            <div className="blood-group">{need.group}</div>
            {/* delete */}
            {/* 3-dot menu */}
            <div className="menu-container">
                <span className="menu-dots" onClick={() => setMenuVisible(menuVisible === need._id ? null : need._id)}>⋮</span>
                {menuVisible === need._id && (
                  <div className="menu-options">
                    <p onClick={() => handleDelete(need._id)}>Delete</p>
                  </div>
                )}
              </div>
            <div className="image-container">
            <img src="../bg-10.jpg" alt="User" className="donor-image" />

            </div>
            <h3>{need.name}</h3>
            <p>📞{need.contact}</p>
            <p>📍{need.location}</p>
          </div>
        ))}
      </div>








      {/* Popup Form */}
      {showForm && (
        <div className="popup-overlay" onClick={() => setShowForm(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3>Need Help? Fill the Details</h3>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <input type="text" placeholder="Blood Group" value={group} onChange={(e) => setGroup(e.target.value)} required />
              <input type="tel" placeholder="Contact Number" value={contact} onChange={(e) => setContact(e.target.value)} required />
              <input type="text" placeholder="Hospital" value={location} onChange={(e) => setLocation(e.target.value)} required />
              
              <button className="btn" type="submit">Submit</button>
              <button className="btn" type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
      </div>
      <div className="ending-donor">
      <div className="ending-con">
        <h3>Happy Patients</h3>
        <h5>
        Immediate Help in Emergencies 🚑
        </h5>
        <p>
       * Patients receive quick blood donations during critical situations. <br />
       * RedHope ensures fast donor matching to save valuable time. <br />
         * Lives are saved with instant availability of the right blood group. 
        </p>
        {/* <h5>
        Stress-Free Experience 🏥
        </h5>
        <p>
        * Easy-to-use platform makes requesting blood simple & fast. <br />
        * Patients and families feel relieved knowing help is on the way. <br />
       * Transparent process reduces anxiety & ensures safe donations.
        </p> */}
        <h5>
        A Second Chance at Life ❤️
        </h5>
        <p>
       * Many patients recover faster thanks to timely blood donations. <br />
     * Families feel grateful & hopeful after receiving the needed blood. <br />
     * The support from RedHope builds a strong, life-saving community.
        </p>
      </div>
      <div className="ending-img">
        <img src='../bg-9.jpeg' alt="Image Loading" />
      </div>
    </div>
    <div className="pink-line"></div>
      <About />
    </div>
  );
};

export default Need;
