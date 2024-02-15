const session = require("express-session");
const router = require("express").Router();
const userController = require("../../controller/userController");
const passport = require("passport");
const { default: axios } = require("axios");
router.use(
    session({
        secret: process.env.SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 60 * 60 * 1000,
            creationDate: Date.now(),
        },
    })
);
const auth = require("../../middleware/userAuth");

router.use(passport.initialize());
router.use(passport.session());

require("../../config/googleAuth");

router.get("/", (req, res) => {
    res.json({ message: "welcome to my Blog API" });
});

router.get("/posts", userController.getPosts);

router.get("/posts/:id", userController.getPost);

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

            // Validate the tokenInfo as needed
            if (tokenInfo.aud === process.env.GOOGLE_CLIENT_ID) {
                res.redirect(`http://localhost:3030/`);
            } else {
                res.status(401).json({ error: "Unauthorized" });
            }
        } catch (error) {
            console.error("Error verifying Google token:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

router.post(
    "/getLoggedInUser",
    auth.isAuthenticatedGoog,
    userController.getLoggedInUser
);

router.get("/session", auth.isAuthenticatedGoog, userController.getCurrentUser);

router.post("/logout", auth.isAuthenticatedGoog, userController.logout);

router.post("/user", userController.createUser);

module.exports = router;
