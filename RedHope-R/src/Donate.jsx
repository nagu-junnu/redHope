import React, { useState, useEffect } from "react";
import Headder from "./Container/Headder";
import About from "./Container/About";
import axios from "axios";

const Donate = () => {
  const [showForm, setShowForm] = useState(false);
  const [donations, setDonations] = useState([]);
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [image, setImage] = useState("");
  const [contact, setContact] = useState("");
  const [location, setLocation] = useState("");
  const [showMenu, setShowMenu] = useState(null); // Track which menu is open

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get("http://localhost:5000/donations");
        setDonations(response.data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };
    fetchDonations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/donations", {
        name,
        group,
        image,
        contact,
        location,
      });

      setShowForm(false); // Close popup after submission
    } catch (error) {
      console.error("Error adding donation:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/donations/${id}`);
      setDonations(donations.filter((donor) => donor._id !== id)); // Remove from frontend
    } catch (error) {
      console.error("Error deleting donation:", error);
    }
  };

  return (
    <div>
      <Headder />
      {/* <div className="body">
        <h1>Donate</h1>
      </div> */}
      <div className="body-sub">
        <div className="body-title">
          <h1>Donate</h1>
          <div className="heart"></div>
        </div>
        <div className="border1"></div>

        <div className="donor-container">
          <div className="add-button" onClick={() => setShowForm(true)}>
            <div className="child-1">
              <h3>Donate Here</h3>
            </div>
            <div className="child-2">
              <div className="center">
                <span style={{ color: "black", fontSize: "24px" }}>+</span>
              </div>
            </div>
          </div>

          {donations.map((donor) => (
            <div key={donor._id} className="donor-card">
              {/* Three Dots Menu */}
              <div className="menu-container">
                <span className="menu-dots" onClick={() => setShowMenu(showMenu === donor._id ? null : donor._id)}>⋮</span>
                {showMenu === donor._id && (
                  <div className="menu-options">
                    <p onClick={() => handleDelete(donor._id)}>Delete</p>
                  </div>
                )}
              </div>

              <div className="blood-group">{donor.group}</div>
              <div className="image-container">
                <img src={donor.image || "../bg-11.jpeg"} alt="Donor" />
              </div>
              <h3>{donor.name}</h3>
              <p>📞 {donor.contact}</p>
              <p>📍 {donor.location}</p>
            </div>
          ))}
        </div>

        {/* Popup Form */}
        {showForm && (
          <div className="popup-overlay" onClick={() => setShowForm(false)}>
            <div className="popup-content" onClick={(e) => e.stopPropagation()}>
              <h3>Fill Donor Details</h3>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Blood Group"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                />
                <input
                  type="tel"
                  placeholder="Contact Number"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
                <button className="btn" type="submit">Submit</button>
                <button className="btn" type="button" onClick={() => setShowForm(false)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
      </div>
      <div className="ending-donor">
        <div className="ending-img">
          <img src="../bg-8.png" alt="Image Loading" />
        </div>
        <div className="ending-con">
          <h3>
            Why Donation?
          </h3>
          <h5>🩸 Saves Lives</h5>
          <p>
          * Every few seconds, someone needs blood due to accidents, surgeries, or medical 
          conditions like cancer, anemia, or blood disorders. <br />
          * A single blood donation can save up to three lives!
          </p>
          <h5>🔁 Promotes Blood Circulation & Health Benefits</h5>
          <p>
         *  Donating blood reduces iron levels in the body, which can lower the risk of heart disease. <br />
          * It also stimulates the production of new blood cells, keeping your body healthy.
          </p>
          <h5>
          🌍 Strengthens Community & Emergency Preparedness
          </h5>
          <p>
          * Blood donation programs create a strong network of donors for emergencies. <br />
          * Donors become part of a lifesaving mission, helping those in urgent need.
          </p>
        </div>
      </div>
      <div className="pink-line"></div>
      <About />
    </div>
  );
};

export default Donate;
