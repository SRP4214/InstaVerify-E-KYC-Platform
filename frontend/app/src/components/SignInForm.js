import "./SignInForm.css";
import React, { useState } from "react";
import axios from "axios";
const SignInForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    contactnumber: "",
    gender: "",
    age: "",
  });

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    contactnumber: "",
    gender: "",
    age: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email address";
      valid = false;
    }

    // Password validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters long, include 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character";
      valid = false;
    }

    // Contact number validation
    if (formData.contactnumber.length !== 10) {
      newErrors.contactnumber = "Contact number must be exactly 10 digits";
      valid = false;
    }
    // if (isNaN(formData.contactnumber)) {
    //   newErrors.contactnumber = "Contact number must be a number";
    //   valid = false;
    // }
    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Please select a gender";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("User Data:", formData);
      const userPayload = Object.keys(formData).reduce((acc, key) => {
        if (formData[key]) {
          acc[key] = formData[key];
        }
        return acc;
      }, {});
      const createUser = async () => {
        const url = "http://localhost:5000/api/user/register";
        try {
          const result = await axios.post(url, userPayload, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(result);
        } catch (error) {
          if (error.response) {
            // Extract the error message and validation data
            const { message, data, statusCode } = error.response.data;
            // Display the validation message (e.g., age-specific validation error)
            if (data && typeof data === "object") {
              // Handle multiple validation errors, if any
              const validationErrors = Object.values(data).join("\n");
              window.alert(`Error ${statusCode}: ${message}\n${validationErrors}`);
            } else {
              // Generic error message if no validation data is provided
              window.alert(`Error ${statusCode}: ${message}`);
            }

            console.log("Error details:", error.response.data);
          } else {
            // Handle any other type of error (e.g., network errors)
            console.error("Error:", error.message);
          }
        }
      };
      createUser();
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} action="POST">
          <div className="form-group">
            <label htmlFor="firstname">First Name:</label>
            <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} required />
            {errors.firstname && <p className="error-text">{errors.firstname}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="lastname">Last Name:</label>
            <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} required />
            {errors.lastname && <p className="error-text">{errors.lastname}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="contactnumber">Contact Number:</label>
            <input type="number" id="contactnumber" name="contactnumber" value={formData.contactnumber} onChange={handleChange} required />
            {errors.contactnumber && <p className="error-text">{errors.contactnumber}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
            {errors.age && <p className="error-text">{errors.age}</p>}
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <div className="radio-group">
              <label htmlFor="male">
                <input type="radio" id="male" name="gender" value="male" checked={formData.gender === "male"} onChange={handleChange} />
                Male
              </label>
              <label htmlFor="female">
                <input type="radio" id="female" name="gender" value="female" checked={formData.gender === "female"} onChange={handleChange} />
                Female
              </label>
            </div>
            {errors.gender && <p className="error-text">{errors.gender}</p>}
          </div>

          <button type="submit" className="btn login-btn">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
