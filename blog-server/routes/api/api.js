const router = require("express").Router();
const userController = require("../../controller/userController");

router.get("/", (req, res) => {
    res.json({ message: "welcome to my Blog API" });
});

router.get("/posts", userController.getPosts);

module.exports = router;
