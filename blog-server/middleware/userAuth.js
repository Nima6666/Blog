const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = (req, res, next) => {
    const bearerToken = req.headers.authorization;
    console.log(bearerToken);

    if (typeof bearerToken !== "undefined") {
        const token = bearerToken.split(" ")[1];
        jwt.verify(token, process.env.SECRET, (err, authData) => {
            if (err) {
                console.log("token invalid");
                res.sendStatus(403);
            } else {
                req.body = authData;
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
};
