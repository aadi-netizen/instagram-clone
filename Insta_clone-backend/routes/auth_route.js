const express = require('express');
const { Ragister, Login } = require('../controllers/auth_controller');
const Router = express.Router();

// ragister route
Router.post('/ragister', Ragister);

// login route
Router.post('/login', Login);


module.exports = Router;