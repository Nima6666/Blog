const router = require("express").Router();
const adminController = require("../controller/adminController");
const isAuth = require("../middleware/userAuth");

router.post("/", adminController.adminCreate);

router.post("/login", adminController.adminLogin);

router.post("/create", isAuth.isAuthenticated, adminController.createPost);

module.exports = router;
