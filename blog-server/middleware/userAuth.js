const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = (req, res, next) => {
    const bearerToken = req.headers.authorization;

    if (typeof bearerToken !== "undefined") {
        const token = bearerToken.split(" ")[1];
        jwt.verify(token, process.env.SECRET, (err, authData) => {
            if (err) {
                console.log("token invalid");
                res.sendStatus(403);
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
