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
        const allPost = await postModel.find().populate('author', '_id user_name');
        // populate() : {1st arg: 'anyfeild in the postModel, 2nd arg: feild name from the ref }
        res.status(200).send(allPost);
    } catch (error) {
        res.send(" view post error: " + error);
    }
}

const myPost = async (req, res) => {
    try {
        const allMyPost = await postModel.find({ author: req.user._id });
        // populate() : {1st arg: 'The feild in the postModel which referenced to another model,
        // 2nd arg: selected feild names from the ref to be populated }
        res.status(200).send(allMyPost);
    } catch (error) {
        res.send(" view post error: " + error);
    }
}


// deletePost controller
const deletePost = async (req, res) => {

    const thePost = await postModel.findOne({ _id: req.params.postId }).populate('author', '_id');
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
    res.status(400).send({ msg: "You are authrized to delete your own post only." })
}


// like post controller
const likePost = async (req, res) => {
    try {
        await postModel.findByIdAndUpdate(req.body.postId, { $push: { like: req.user._id } }, { new: true })
            .populate('like', 'user_name').exec();
        return res.status(200).send({ msg: "user successfully liked the post" })
    } catch (error) {
        console.log("like post: " + error);
        res.status(500).send("like post: " + error);
    }
}

// unlike post controller
const unlikePost = async (req, res) => {
    try {
        await postModel.findByIdAndUpdate(req.body.postId, { $pull: { like: req.user._id } }, { new: true })
        // .populate('author', "user_name");
        return res.status(200).send({ msg: "user successfully unliked the post" })
    } catch (error) {
        console.log("like post: " + error);
        res.status(500).send("like post: " + error);
    }
}

// post-comment controller
const commentPost = async (req, res) => {
    const comment = { commentText: req.body.commentText, commentedBy: req.user};

    try {
        await postModel.findByIdAndUpdate(req.body.postId, { $push: { comment: comment } }, { new: true })
        .populate("comment.commentedBy", "_id fullName") //comment owner;
        res.status(201).send(`User's comment has successfully posted.`);
    } catch (error) {
        console.log("comment post error: " + error);
        res.status(500).send("comment post error: " + error);
    }
}




module.exports = { createPost, viewPost, myPost, deletePost, likePost, unlikePost, commentPost }