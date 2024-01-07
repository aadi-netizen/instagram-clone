const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const userModel = require('../models/user_model');
const { model } = require('mongoose');




const authenticate = async (req,res,next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(400).send({msg: "Access attempt absence of authrizaion"});
    }

    const token = authHeader.replace('Bearer ', "");

    //  //check the Token
    //  const authHeader = req.headers["authorization"];

    //  if (!authHeader) {
    //      return res.status(401).json({ message: "UnAuthoried.." })
    //  }
    //  //if header is available then extract token for the same.
    //  const token = authHeader.replace('Bearer ', "");

    // if (!token) {
    //     return res.status(400).send({msg: "unauthorized"});
    // }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById({_id:decoded._id},{password:0});

    req.user= user;
    next();
}


module.exports = authenticate;