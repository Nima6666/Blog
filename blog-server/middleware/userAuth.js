const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = (req, res, next) => {
    const bearerToken = req.headers.authorization;

    if (typeof bearerToken !== "undefined") {
        const token = bearerToken.split(" ")[1];
        jwt.verify(token, process.env.SECRET, (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                console.log(authData);
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
};
