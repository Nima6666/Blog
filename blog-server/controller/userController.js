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
    console.log(req.session);
    try {
        res.json(req.user);
    } catch (err) {
        res.error(err);
    }
};

module.exports.logout = async (req, res) => {
    try {
        // req.logout((err) => {
        //     if (err) {
        //         return res.send({ error: err });
        //     }
        //     res.clearCookie();
        console.log("logging out");
        //     res.json({
        //         success: true,
        //         message: "user logged out successfully",
        //     });
        // });

        req.session.destroy((err) => {
            if (err) {
                console.error("Error destroying session", err);
                return res
                    .status(500)
                    .json({ success: false, message: "Logout failed" });
            }
            // Optionally, clear cookies or tokens here if needed
            res.json({ success: true, message: "Logout successful" });
        });
    } catch (err) {
        res.json(err);
    }
};
