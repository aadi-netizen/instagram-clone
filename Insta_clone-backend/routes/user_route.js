const express = require('express');
const Router = express.Router();
const { getAllUsers,getUserById,deleteUser,updateUser } = require('../controllers/user_controllers');
const authenticate = require('../middlewares/protectedRoutes');




// get all existing users
Router.get('/', getAllUsers);

// find a user by id
Router.get('/profile',authenticate, getUserById);


// updating user
Router.patch('/:id',updateUser);

// deleting a user by id
Router.delete('/:id',deleteUser);



module.exports = Router;



