const post = require("../model/post");
const passport = require("passport");

const mongoose = require("mongoose");

const User = require("../model/User");
module.exports.getPosts = async (req, res) => {
    try {
        const posts = await post.find({ published: true });
        const postsWithUrl = posts.map((post) => ({
            ...post,
            url: post.url,
        }));
        setTimeout(() => {
            res.json({ posts: [...postsWithUrl], user: req.user });
        }, 500);
    } catch (error) {
        console.log("error finding posts");
        res.json({ error });
    }
};

module.exports.getPost = async (req, res) => {
    const id = req.params.id;
    console.log(id);

    try {
        const postFoundUsingID = await post.findById(id);

        if (!postFoundUsingID) {
            return res.status(404).json({
                success: false,
                message: "post not found",
            });
        }

        const postsWithUrl = {
            postFoundUsingID,
            url: postFoundUsingID.url,
            user: req.user,
        };

        res.json({
            url: postFoundUsingID.url,
            _doc: postFoundUsingID,
        });
    } catch (err) {
        res.json({
            message: err,
        });
    }
};

module.exports.getLoggedInUser = async (req, res) => {
    console.log(req.body);

    try {
        const foundUser = await googleUser.findById(req.body.id);
        res.json(foundUser);
    } catch (err) {
        res.json(err);
    }
};

module.exports.getCurrentUser = (req, res) => {
    try {
        res.json(req.user);
    } catch (err) {
        res.error(err);
    }
};

module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        res.clearCookie("connect.sid", { path: "/", domain: null });
        res.json({
            success: true,
            message: "user logged out successfully",
        });
    });
};

module.exports.createUser = async (req, res) => {
    try {
        console.log(req.body);
        res.json(req.body);
    } catch (err) {
        res.json(err);
    }
};
