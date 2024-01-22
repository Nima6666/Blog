const post = require("../model/post");
const passport = require("passport");

const googleUser = require("../model/googleOauthUser");
module.exports.getPosts = async (req, res) => {
    try {
        const posts = await post.find({ published: true });
        const postsWithUrl = posts.map((post) => ({
            ...post,
            url: post.url,
        }));
        setTimeout(() => {
            res.json(postsWithUrl);
        }, 500);
    } catch (error) {
        console.log("error finding posts");
        res.json({ error });
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
