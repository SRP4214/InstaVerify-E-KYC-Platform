const ApiResponse = require("../utils/ApiResponse");
const User = require("../database/models/users");
const passwordUtil = require("../utils/hashPassword");

async function createUser(req, res, next, session) {
  console.log("Creating User");
  try {
    const { firstname, lastname, email, password, gender, age } = req.body;
    const existingUser = await User.findOne({ email: email }).session(session).exec();
    if (existingUser) {
      return res.status(409).json(new ApiResponse(409, "User with this email already exists"));
    }
    return await User.create(
      [
        {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: await passwordUtil.hashPassword(password),
          gender: gender,
          age: age,
        },
      ],
      { session }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.name == "ValidationError") {
      const validationErrors = Object.values(error.errors).map((err) => err.message);

      const structuredErrors = {};
      for (const field in error.errors) {
        structuredErrors[field] = error.errors[field].message;
      }

      return res.status(400).json(new ApiResponse(400, "Validation failed", structuredErrors));
    }
    // console.error(error);
    return res.status(500).json(new ApiResponse(500, "Failed to create user"));
  }
  // secure password here
  //body.password
}

async function getUserById(userID) {
  console.log("Getting User");
  try {
    let user = await User.findById(userID);
    if (!user) {
      return res.status(404).json(new ApiResponse(404, "User not found"));
    }
    return res.status(200).json(new ApiResponse(200, "User found", user));
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, "Failed to get user"));
  }
}
module.exports = { createUser };
