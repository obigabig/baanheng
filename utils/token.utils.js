const keys = require('../config/keys/keys')
var jwt = require('jsonwebtoken');

var createToken = function(user) {   
    return jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email
        }, keys.jwtSecret,
        {
            expiresIn: 60 * 120
        });
};

module.exports = {
    generateToken: function(req, res, next) {
        req.token = createToken(req.user);
        return next();
    },
    sendToken: function(req, res) {
        res.setHeader('x-auth-token', req.token);
        return res.status(200).send(JSON.stringify(req.user));
    }
};