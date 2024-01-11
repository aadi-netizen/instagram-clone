const mongoose = require('mongoose');
const userModel = require('./user_model');
const { ObjectId } = mongoose.Schema.Types;


const postSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    author: {
        type: ObjectId,
        ref: userModel
    }
},{ timestamps: true });

const postModel = mongoose.model('postModel', postSchema);

module.exports = postModel;