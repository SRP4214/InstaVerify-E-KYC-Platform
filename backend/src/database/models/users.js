const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "firstname is a required field."],
    minlength: [2, "Firstname must be at least 2 characters long"],
    maxlength: [50, "Firstname cannot exceed 50 characters"],
    match: [/^[a-zA-Z\s'-]+$/, "Firstname contains invalid characters"],
  },
  lastname: {
    type: String,
    required: [true, "lastname is a required field."],
    minlength: [2, "Lastname must be at least 2 characters long"],
    maxlength: [50, "Lastname cannot exceed 50 characters"],
    match: [/^[a-zA-Z\s'-]+$/, "Lastname contains invalid characters"],
  },
  email: {
    type: String,
    required: [true, "email is a required field"],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"],
  },
  password: {
    type: String,
    required: [true, "password is a required field"],
    minlength: [8, "Password must be at least 8 characters long"],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
    ],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "other"],
      message: "Please select a valid gender option.",
    },
    required: [true, "Gender is required"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  contactnumber: {
    type: Number,
    required: [true, "Contact number is required"],
    match: [/^(\+\d{1,3}[- ]?)?\d{10}$/, "Please enter a valid contact number"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [18, "You must be at least 18 years old to register"], // <-- Custom message for min
    max: [60, "Age cannot exceed 60"],
  },
  createdAt: { type: "date", default: new Date() },
});

module.exports = mongoose.model("User", userSchema);
