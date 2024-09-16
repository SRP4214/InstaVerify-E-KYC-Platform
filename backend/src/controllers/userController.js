const ApiResponse = require("../utils/ApiResponse");
const UserService = require("../services/userService");
const mongoose = require("mongoose");

async function registerUser(req, res, next) {
  console.log("registerUser Controller received Request", req.body);

  // Pass the session to the service function
  await UserService.createUser(req, res, next).then((result) => {
    console.log("registerUser controller results", result);
    return res.status(result.statusCode).send(result);
  });
}

async function getUserById(req, res, next) {
  console.log("getUserById Controller received Request", req.params);
  try {
    // const result = await UserService.getUserById(res, req.params.id);
    UserService.getUserById(res, req.params.userID).then((result) => {
      console.log("getUserByID controller results", result);
      res.status(result.statusCode).send(result);
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { registerUser, getUserById };
