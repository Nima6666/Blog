const session = require("express-session");
const router = require("express").Router();
const userController = require("../../controller/userController");
const passport = require("passport");
const { default: axios } = require("axios");

router.use(
    session({
        secret: process.env.SECRET,
        saveUninitialized: true,
        resave: false,
        cookie: {
            maxAge: 60 * 60 * 1000,
        },
    })
);
require("../../config/googleAuth");

router.get("/", (req, res) => {
    res.json({ message: "welcome to my Blog API" });
});

router.get("/posts", userController.getPosts);

router.get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "http://localhost:3030/failed",
    }),
    async (req, res) => {
        try {
            const accessToken = req.accessToken;

            if (!accessToken) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const response = await axios.get(
                `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`
            );
            const tokenInfo = response.data;

            if (tokenInfo.aud === process.env.GOOGLE_CLIENT_ID) {
                res.cookie("accessToken", accessToken, {
                    httpOnly: true,
                    secure: true,
                });
                res.redirect("http://localhost:3030");
            } else {
                res.status(401).json({ error: "Unauthorized" });
            }
        } catch (error) {
            console.error("Error verifying Google token:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

module.exports = router;
