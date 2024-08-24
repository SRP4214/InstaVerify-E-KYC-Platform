const ApiResponse = require("../utils/ApiResponse");
const UserService = require("../services/userService");
const mongoose = require("mongoose");

async function registerUser(req, res, next) {
  const session = await mongoose.startSession();
  session.startTransaction();
  console.log("registerUser Controller received Request", req.body);
  try {
    // Pass the session to the service function
    await UserService.createUser(req, res, next, session).then((result) => {
      console.log("registerUser controller results", result);
      return res.status(201).json(new ApiResponse(201, "User created successfully", result));
    });
    await session.commitTransaction();
  } catch (error) {
    await session.abortTransaction();
    console.error("Transaction aborted due to error:", error);
    next(error); // Pass the error to error-handling middleware
  } finally {
    session.endSession();
  }
}

async function getUserById(req, res, next) {
  console.log("getUserById Controller received Request", req.body, req.params);
  UserService.getUserById(res, req.params.id).then((result) => {
    console.log("getUserByID controller results", result);
    res.status(result.statusCode).send(result);
  });
}
module.exports = { registerUser, getUserById };
