const { reset } = require("nodemon");
const admin = require("../model/admin");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const post = require("../model/post");

module.exports.adminCreate = async (req, res) => {
    try {
        await admin.find({}).then((adminFound) => {
            if (adminFound.length > 0) {
                res.status(400).json({
                    message:
                        "the admin has already been registered for this server",
                });
            } else {
                bcryptjs.hash(
                    req.body.password,
                    10,
                    async (err, hashedPassword) => {
                        const theAdmin = new admin({
                            username: req.body.username,
                            password: hashedPassword,
                        });

                        try {
                            await theAdmin.save();

                            res.json({
                                message: "admin created successfully",
                                theAdmin,
                            });
                        } catch (err) {
                            res.json({ message: err });
                        }
                    }
                );
            }
        });
    } catch (err) {
        res.status(500).json({
            message: err,
        });
    }
};

module.exports.adminLogin = async (req, res) => {
    try {
        const adminfound = await admin.findOne({ username: req.body.username });
        console.log(adminfound);
        if (adminfound) {
            const isValidPassword = await bcryptjs.compare(
                req.body.password,
                adminfound.password
            );
            if (isValidPassword) {
                console.log("admin logged in successfully");
                const infoObject = {
                    id: adminfound._id,
                };
                const expiryInfo = {
                    expiresIn: "1h",
                };

                const token = jwt.sign(
                    infoObject,
                    process.env.SECRET,
                    expiryInfo
                );
                res.json({
                    token: token,
                    username: adminfound.username,
                });
            } else {
                console.log("incorrect username or password");
                res.status(403).json({
                    message: "incorrect username or password",
                });
            }
        } else {
            console.log("incorrect username or password");
            res.status(403).json({
                message: "incorrect username or password",
            });
        }
    } catch (err) {
        res.json({
            message: err,
        });
    }
};

module.exports.getPosts = async (req, res) => {
    try {
        const posts = await post.find({});
        const postsWithUrl = posts.map((post) => ({
            ...post,
            url: post.url,
        }));
        res.json(postsWithUrl);
    } catch (error) {
        res.json({ error });
    }
};

module.exports.createPost = async (req, res) => {
    try {
        const postCreation = new post(req.body);
        const postCreated = await postCreation.save();
        res.json({
            message: "post Creation",
            postCreated,
        });
    } catch (err) {
        res.status(500).json({
            message: err,
        });
    }
};
