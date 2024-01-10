const router = require("express").Router();
const adminController = require("../controller/adminController");
const isAuth = require("../middleware/userAuth");

router.post("/", adminController.adminCreate);

router.post("/login", adminController.adminLogin);

router.get("/posts", isAuth.isAuthenticated, adminController.getPosts);

router.post("/posts", isAuth.isAuthenticated, adminController.createPost);

router.delete("/posts/:id", isAuth.isAuthenticated, adminController.deletePost);

router.patch("/posts/:id", isAuth.isAuthenticated, adminController.publish);

module.exports = router;
