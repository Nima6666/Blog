const post = require("../model/post");
const passport = require("passport");

const googleUser = require("../model/googleOauthUser");
module.exports.getPosts = async (req, res) => {
    console.log(req.session, "session");
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
        };

        console.log(postsWithUrl);

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
