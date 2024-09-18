const ApiResponse = require("../utils/ApiResponse");
const User = require("../database/models/users");
const passwordUtil = require("../utils/hashPassword");

async function createUser(req, res, next) {
  console.log("Creating User");
  try {
    const { firstname, lastname, email, password, gender, age } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return new ApiResponse(409, "User with this email already exists");
    }
    const newUser = await User.create([
      {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: await passwordUtil.hashPassword(password),
        gender: gender,
        age: age,
      },
    ]);
    return new ApiResponse(201, "User created successfully", newUser);
  } catch (error) {
    if (error.name == "ValidationError") {
      const structuredErrors = Object.keys(error.errors).reduce((acc, field) => {
        acc[field] = error.errors[field].message;
        return acc;
      }, {});
      console.error("Error creating user:", structuredErrors);
      return new ApiResponse(400, "Validation failed", structuredErrors);
    }
    // console.error(error);
    return new ApiResponse(500, "Failed to create user");
  }
  // secure password here
  //body.password
}

async function getUserById(res, userID) {
  if (!userID) new ApiResponse(400, "User ID not provided");
  console.log("Getting User");
  try {
    console.log(userID);
    let user = await User.findById(userID);
    console.log(user);
    if (!user) {
      return new ApiResponse(404, "User not found");
    }
    return new ApiResponse(200, "User found", user);
  } catch (error) {
    return new ApiResponse(500, "Failed to get user");
  }
}
module.exports = { createUser, getUserById };
