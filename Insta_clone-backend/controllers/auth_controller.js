const userModel = require('../models/user_model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const Ragister = async (req, res) => {
    try {
        const { user_name, email, password, profile_pic } = req.body;
        console.log("request body: " + user_name, email, password, profile_pic);
        if (!user_name || !email || !password) {
            return res.send({ "msg": `All fields expect profile_pic cannot be empty` });
        }

        // login authentication: existing user
        const user = await userModel.findOne({ email });
        if (user) {
            return res.send({ msg: "user already exist." });
        }

        // hashing password and creating new user
        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword);
        const newUser = userModel({ user_name, email, password: hashPassword });
        const resp = await newUser.save();
        res.send(`User saved with credentials ${resp}`);


    } catch (error) {
        console.log(`user ragistration error: ${error}`);
        res.status(400).send(error);
    }

};

// login controller
const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login request body: " + email, password);
        if (!email || !password) {
            return res.send({ "msg": `All fields expect profile_pic cannot be empty` });
        }

        // login authentication for new user/email_id
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).send(`${email} email_id is not not ragistered yet.`);
        }
        

        const match = await bcrypt.compare(password,user.password);
        if (!match) {
            res.status(400).send(`wrong password. Please try again..`);
        }

        // payload to encoded as token
        const payload = {
            _id: user._id,
            name: user.user_name,
            email: user.email
        };

        //token generation
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        console.log(token);
        res.status(200).send("user has been logged in successfully.Token:" +  token);

    } catch (error) {
        console.log(`user Login error: ${error}`);
    }

};



module.exports = { Ragister, Login };