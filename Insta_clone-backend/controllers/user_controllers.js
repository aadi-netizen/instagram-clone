const userModel = require('../models/user_model');


// get user by id 
const getUserById = (req, res) => {
    // user property of the request is coming from authenticate middleware 
    res.status(200).send(req.user);
};


// get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).send(users);
    } catch (error) {
        console.log(`Get all users error: ${error}`);
        res.send(error);
    }
};


// update a user by id
const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findByIdAndUpdate(id, { user_name: "aditya2" });
        console.log("user after update " + user);
        res.status(200).send(user);
    } catch (error) {
        res.status(404).send({ msg: "user doesn't exist" });
    }
};

const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await userModel.findByIdAndDelete(id);
        res.status(200).send(user);
    } catch (error) {
        res.status(404).send({ msg: "user doesn't exist" });
    }
};


module.exports = {  getAllUsers, getUserById, updateUser, deleteUser };

