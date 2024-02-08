const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = (req, res, next) => {
    const bearerToken = req.headers.authorization;

    if (typeof bearerToken !== "undefined") {
        const token = bearerToken.split(" ")[1];
        jwt.verify(token, process.env.SECRET, (err, authData) => {
            if (err) {
                console.log("token invalid");
                res.status(403).json({
                    message: "access denied",
                });
            } else {
                req.headers.authData = authData;
                next();
            }
        });
    } else {
        console.log("smthng went wrong validating token");
        res.sendStatus(403);
    }
};

module.exports.isAuthenticatedGoog = (req, res, next) => {
    console.log("Checking authentication...");
    if (req.isAuthenticated()) {
        console.log(req.user);
        return next();
    } else {
        console.log("User is not authenticated.");
        return res.json({
            message: "user is not authenticated",
        });
    }
};
