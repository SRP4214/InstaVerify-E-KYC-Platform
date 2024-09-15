import React from 'react';
import './Home.css';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
    const gotToLoginPage =()=> {
        navigate("/login");
    }
  return (
    <div className="home-page">
      <header className="header">
        <h1>Welcome to E-KYC Portal</h1>
        <p>Your trusted platform for secure identity verification</p>
      </header>

      <section className="content">
        <div className="user-actions">
          <h2>Get Started</h2>
          <button className="btn start-btn">Start KYC Process</button>
          <button className="btn login-btn" onClick={() => gotToLoginPage()}>Login</button>
        </div>

        <div className="steps">
          <h2>How E-KYC Works</h2>
          <ol>
            <li>Upload your document for verification</li>
            <li>Complete identity verification process</li>
            <li>Get confirmation within minutes</li>
          </ol>
        </div>
      </section>

      <footer className="footer">
        <p>&copy; 2024 E-KYC Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
