const router = require("express").Router();

router.get("/", (req, res) => {
    res.json({ message: "this is an api route" });
});

router.get("/post", (req, res) => {
    res.json({ message: " this should be a protected route" });
});

module.exports = router;
