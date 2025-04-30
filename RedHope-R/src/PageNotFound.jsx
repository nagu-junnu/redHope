import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
    return (
        <div style={{ textAlign: "center", marginTop: "60px" }}>
            <h1 style={{ fontSize: "50px", color: "red" }}>404</h1>
            <h1> Page Not Found.</h1>
            <Link to="/" className='btn' style={{ fontSize: "20px" ,textDecoration:'none',margin:'30px'}}>Go Home</Link>
        </div>
    );
};

export default PageNotFound;
