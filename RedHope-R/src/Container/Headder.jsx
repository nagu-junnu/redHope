import React from 'react';
import '../App.css';
window.addEventListener("scroll", function() {
  let navbar = document.getElementById("navbar");
  
  if (window.scrollY > 50) { // Scroll 50px ayinappudu
      navbar.classList.add("scrolled");
  } else {
      navbar.classList.remove("scrolled");
  }
});

const Headder = () => {
  return (
    <div className="headder" id='navbar'>
      <nav className="navbar">
        <h3>RedHope</h3>
        <ul className="nav justify-content-end">
          <li>
            <a className="btn" href="/">Home</a>
          </li>
          <li>
            <a className="btn" href="./Donate">Donate</a>
          </li>
          <li>
            <a className="btn" href="./Need">Need</a>
          </li>
          <li>
            <a className="btn" href="./Camp">Camps</a>
          </li>
          {/* <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle btn"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Camps
            </a>
            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <a className="dropdown-item btn" href="./Camp">Ongoing</a>
              </li>
              <li>
                <a className="dropdown-item btn" href="./Camp">Completed</a>
              </li>
            </ul>
          </li> */}
          
          <li>
            <a className="btn" href="/ContactPage">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Headder;
