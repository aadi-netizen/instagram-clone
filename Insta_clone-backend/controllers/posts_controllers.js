const postModel = require("../models/post_model");




const createPost = async (req, res) => {
    const { description, location, image } = req.body;

    try {
        if (!description || !location || !image) {
            return res.status(400).send({ msg: "All feilds are mandatory" });
        }

        const newPost = new postModel({ description: description, location: location, image: image, author: req.user });
        await newPost.save();
        console.log(newPost);

        res.status(201).send({
            msg: "new post created",
            newPost: newPost
        });

    } catch (error) {
        res.status(400).send(`create post error: ${error}`);
    }
}

const viewPost = async (req, res) => {
    try {
        const allPost = await postModel.find().populate('author', 'user_name');
        // populate() : {1st arg: 'anyfeild in the postModel, 2nd arg: feild name from the ref }
        res.status(200).send(allPost);
    } catch (error) {
        res.send(" view post error: " + error);
    }
}

const myPost = async (req, res) => {
    try {
        const allPost = await postModel.find({ author: req.user._id });
        // populate() : {1st arg: 'anyfeild in the postModel, 2nd arg: feild name from the ref }
        res.status(200).send(allPost);
    } catch (error) {
        res.send(" view post error: " + error);
    }
}


// deletePost controller
const deletePost = async (req, res) => {

    const thePost = await postModel.findOne({ _id: req.params.postid }).populate('author', '_id');
    console.log(`delete post API: ${thePost}`);
    if (!thePost) {
        return res.status(400).send({ msg: "Selected post is not found" });
    }
    // check: whether the author's id is same as the logged user

    if (thePost.author._id.toString() == req.user._id.toString()) {
        // without toString() method The check was getting failed
        console.log("The author is matching the logged user.");
        try {
            await postModel.deleteOne({ _id: req.params.postid })
            return res.status(200).send({
                msg: "Selected post has been deleted successfully.",
                // selectedPost: thePost
            });
        } catch (error) {
            console.log("Some error in deleting the post" + error);
            return res.status(500).sendJ({
                msg: `${error} in deleting the post `
            })
        }
    }
    res.status(400).send({msg: "You are authrized to delete your own post only."})
}

module.exports = { createPost, viewPost, myPost, deletePost }