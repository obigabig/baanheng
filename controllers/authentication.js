const jwt = require('jwt-simple');
const User = require('../models/user');
const UserSubInvestor = require('../models/userSubInvestor');
const keys = require('../config/keys/keys');
const _ = require('lodash');

/*function tokenForUser(user) {
    const secretKey = keys.jwtSecret;
    //const timestamp = new Date().getTime();
    const payload = { sub: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        iat: Math.round(Date.now() / 1000),
        exp: Math.round((Date.now() / 1000) + (7 * 24 * 60 * 60))}
        //exp: Math.round(Date.now() / 1000 + 60) }
    return jwt.encode(payload, secretKey);   // 5 Hours = (5 * 60 * 60)
}

exports.signin = (req,res,next) => {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
}*/

exports.signup = async (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    if(!email || !password){
        res.status(422).send({ error: 'You must provide email and password.'});
    }

    try {
        const existingUser = await User.findOne()
            .where("email").in([email])
            .exec();
        
        if(existingUser){
            return res.status(422).send( {error: 'Email is already in use.'} )
        }

        let user, userSubInvestors;
        user = new User({
            name,
            local: {    
                email: email,
                password: password
            }
        });
        userSubInvestors = new UserSubInvestor({name , isDefault: true});
        user.userSubInvestors.push(userSubInvestors);
        
        await userSubInvestors.save();
        await user.save();
        
        res.json({ token: tokenForUser(user)})
        
    } 
    catch(e){
        console.log(e);
        res.status(422).send({ error: `Cannot signup:` + e});
    }
}

exports.getCurrentUser = async (req,res) => {
    try {
        // Get user detail
        const user = await User.findById(req.user.id)
            .populate('userSubInvestors')
            .exec();
        res.send(user)
    }
    catch(e){
        console.log(e);
        res.status(422).send({ error: `Cannot getCurrentUser:` + e});
    }
}

exports.selectUserSubInvestors = async (req,res,next) => {
    const email = req.user.email;
    try{
        const existingUser = await User.findOne({ "email": email })
            .select('userSubInvestors')
            .populate('userSubInvestors')
            .exec();
            
        // If a user with email does exist, return an error
        if (!existingUser){
            return res.status(422).send( {error: 'User sub investors is not found.'} )
        }

        //send output in react-select format
        res.send(_.map(existingUser.userSubInvestors, ({_id, name}) => {
            return {value: _id, label: name}
        }));

    }catch(err){
        return next(err);
    }

};


exports.getAuthenticateUser = (req,res,next) => {
    try{
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }
        req.auth = {
            id: req.user.id
        };

        next();
    }
    catch(err){
        return next(err)
    }
}