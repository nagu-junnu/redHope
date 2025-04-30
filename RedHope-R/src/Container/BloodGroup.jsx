import React, { useState } from "react";
import Slides1 from "./Slides1";

const bloodCompatibility = {
  "O+": { donateTo: ["O+", "A+", "B+", "AB+"], receiveFrom: ["O+", "O-"] },
  "O-": { donateTo: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"], receiveFrom: ["O-"] },
  "A+": { donateTo: ["A+", "AB+"], receiveFrom: ["A+", "A-", "O+", "O-"] },
  "A-": { donateTo: ["A+", "A-", "AB+", "AB-"], receiveFrom: ["A-", "O-"] },
  "B+": { donateTo: ["B+", "AB+"], receiveFrom: ["B+", "B-", "O+", "O-"] },
  "B-": { donateTo: ["B+", "B-", "AB+", "AB-"], receiveFrom: ["B-", "O-"] },
  "AB+": { donateTo: ["AB+"], receiveFrom: ["O+", "O-", "A+", "A-", "B+", "B-", "AB+", "AB-"] },
  "AB-": { donateTo: ["AB+", "AB-"], receiveFrom: ["A-", "B-", "O-", "AB-"] },
};

const BloodGroup = () => {
  const [selectedGroup, setSelectedGroup] = useState("O+"); // Default set to "O+"
  const bloodGroups = Object.keys(bloodCompatibility);

  return (
    <div className='body-sub-bg'>
      <div className='body-title'>
        <h1>Blood Relations</h1>
      </div>
      <div className='border1'></div>

      <div className="blood-container">
         

        {/* Blood Groups - Single Row */}
        <div className="blood-group-row">
          {bloodGroups.map((group) => (
            <button
              key={group}
              className={`blood-group-btn ${selectedGroup === group ? "selected" : ""}`}
              onClick={() => setSelectedGroup(group)}
            >
              {group}
            </button>
          ))}
        </div>

        {/* Blood Compatibility Table */}
        {selectedGroup && (
          <div className="blood-details">
            <div className="row">
              
              <h4 className="label">Can Donate To:</h4>
              <p className="donate">{bloodCompatibility[selectedGroup].donateTo.join(", ")}</p>
            </div>
            <div className="row">
              <h4 className="label">Can Receive From:</h4>
              <p className="receive">{bloodCompatibility[selectedGroup].receiveFrom.join(", ")}</p>
            </div>
          </div>
        )}
      </div>
      <div className="slide-cont">
      <Slides1/>
      <div className="slide-content">
      <h3>Why RedHope Matters?</h3>
      <p>Every second, someone in the world needs a blood transfusion.
         However, finding a matching donor at the right time can be challenging. RedHope eliminates these
         barriers by providing an efficient, real-time solution to connect donors with recipients, ultimately
          saving lives faster and more efficiently. <br />By making blood donation accessible, efficient, and well-organized, 
          RedHope ensures that no life is lost due to the unavailability of blood. Our goal is to build a strong network of donors 
          who are always ready to save lives.<br />With RedHope, donating blood is just a few clicks away, 
          making it easier than ever to be a hero for someone in need. 
          One donation can save up to three lives!</p>
          </div>
      </div>
      <div className="pink-line"></div>
    </div>
  );
};

export default BloodGroup;
