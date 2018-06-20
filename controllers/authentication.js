const jwt = require('jwt-simple');
const User = require('../models/user');
const keys = require('../config/keys/keys');

function tokenForUser(user) {
    const secretKey = keys.jwtSecret;
    //const timestamp = new Date().getTime();
    return jwt.encode({ sub: user.id,
                         username: user.name,
                         isAdmin: user.isAdmin,
                         iat: Math.round(Date.now() / 1000),
                         exp: Math.round(Date.now() / 1000 + keys.tokenLifeTime)  }
                        , secretKey);   // 5 Hours(5 * 60 * 60)
}

exports.signin = (req,res,next) => {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = (req,res,next) => {

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    if(!email || !password){
        res.status(422).send({ error: 'You must provide email and password.'});
    }

    // See if a user with the given email exists
    User.findOne({ "local.email": email }, (err, existingUser) => {
        if (err) { return next(err); }

        // If a user with email does exist, return an error
        if (existingUser){
            return res.status(422).send( {error: 'Email is already in use.'} )
        }

        // If a user with email does NOT exist, create and save user record
        const user = new User({
            name: name,
            local: {    
                email: email,
                password: password
            }
        });

        user.save(err => {
            if (err) { return next(err); }

            // Repond to request indicating the user was created
            res.json({ token: tokenForUser(user)})
        });

    });
}

exports.currentUser = (req,res,next) => {
    // Get user detail
    const userdetail = {
        name: req.user.name,
        isAdmin: req.user.isAdmin
    }
    
    res.send(userdetail);
  }