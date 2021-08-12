const jwt = require("jsonwebtoken");
const { secret } = require("../config");
const isEmptyObject = require("../isEmptyObject");
module.exports = function(req, res, next) {

    if (req.method === "OPTIONS") {
        next();
    }



    try {

        const token = req.headers.authorization;
        if (!isEmptyObject(token)) {
            token = req.headers.authorization.split(" ")[1];
            const decodedToken = jwt.verify(token, secret);
            res.adminStatus = decodedToken;
        } else {
            res.adminStatus = false;

        }
        next();
        // if (!token) {
        //     res.adminStatus = false;
        // } else {
        //     const decodedToken = jwt.verify(token, secret);
        //     res.adminStatus = decodedToken;
        //     next();
        // }
    } catch (error) {
        console.log(error);
        return res.status(403);
    }
}