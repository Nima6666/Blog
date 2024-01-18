const session = require("express-session");
const router = require("express").Router();
const userController = require("../../controller/userController");
const passport = require("passport");
require("../../config/googleAuth");

router.use(
    session({
        secret: process.env.SECRET,
    })
);

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
    passport.authenticate("google", { failureRedirect: "/login" }),
    async (req, res) => {
        try {
            // Retrieve the access token from the session
            const accessToken = req.accessToken;

            if (!accessToken) {
                // Handle the case where there is no access token
                return res.status(401).json({ error: "Unauthorized" });
            }

            // Verify the access token using Google's tokeninfo endpoint
            const response = await axios.get(
                `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`
            );
            const tokenInfo = response.data;

            // Validate the tokenInfo as needed
            if (tokenInfo.aud === process.env.GOOGLE_CLIENT_ID) {
                // The token is valid, and the audience matches your client ID
                // Perform additional actions (e.g., establish a user session) as needed

                // Redirect to the frontend or perform other actions
                res.redirect("http://localhost:3030");
            } else {
                // The token is not valid for your application
                res.status(401).json({ error: "Unauthorized" });
            }
        } catch (error) {
            console.error("Error verifying Google token:", error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

module.exports = router;
