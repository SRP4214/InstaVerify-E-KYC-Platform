const express = require('express');
const route = express.Router();
const userController = require('../controllers/userController');


route.get('/getUser/:userID',userController.getUserById);
route.post('/register',userController.registerUser);
module.exports = route;