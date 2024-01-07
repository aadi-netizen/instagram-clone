const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile_pic: {
        type: String,
        default: "https://picsum.photos/200"
    },
    dateOfBirth: String,
    location: String
},{ timestamps: true });

const userModel = mongoose.model('userModel', userSchema);



module.exports = userModel;