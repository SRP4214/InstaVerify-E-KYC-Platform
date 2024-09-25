# InstaVerify - E-KYC Platform

InstaVerify is a fast and secure e-KYC (Electronic Know Your Customer) platform that aims to streamline the KYC process using advanced technologies like OCR, facial recognition, and the MERN stack (MongoDB, Express, React, Node.js). This project offers an efficient way to verify government ID details and customer identities using modern tools.

## Tech Stack
- **Frontend**: React (running as a microservice)
- **Backend**: Node.js, Express (running as a microservice)
- **Database**: MongoDB (with potential use of GridFS for image storage)
- **Authentication**: Passport.js
- **Image Storage**: Considering GridFS (MongoDB's file storage mechanism)
- **Image Processing**: OpenCV/FaceRecognition module in Python
- **Other Tools**: Axios for API requests, OCR for extracting data from government IDs

## Project Architecture
The project follows a microservices architecture with separate services for the frontend and backend:
- **Frontend** runs on port `3000`
- **Backend** runs on port `5000`

These services communicate via RESTful APIs, ensuring a modular, scalable, and independent structure.

## Features

### Completed
- **User Authentication**: 
  - Sign-in and Sign-up functionality using `Passport.js`.
  - Secure handling of user credentials with JWT (JSON Web Tokens).
  
### Upcoming Features
- **OCR-based ID Verification**:
  - Extract data from uploaded government IDs to validate customer information.
- **Facial Recognition**:
  - Use OpenCV/FaceRecognition module to verify customer identity against the uploaded ID.
- **Image Storage**:
  - Use GridFS to store customer-uploaded images securely.

## Getting Started

### Prerequisites
- Node.js and npm
- MongoDB (local or cloud-based using MongoDB Atlas)
- Python (if using facial recognition module)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/InstaVerify.git
   cd InstaVerify
