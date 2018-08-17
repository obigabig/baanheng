const passport = require('passport');
const User = require('../models/user');
const keys = require('../config/keys/keys');

var GoogleTokenStrategy = require('passport-google-token').Strategy;
var FacebookTokenStrategy = require('passport-facebook-token');


const fbLogin = new FacebookTokenStrategy({
    clientID: keys.facebookAuth.clientID,
    clientSecret: keys.facebookAuth.clientSecret
  },
  (accessToken, refreshToken, profile, done) => {
    User.upsertFbUser(accessToken, refreshToken, profile, (err, user) => {
      return done(err, user);
    });
})

const googleLogin = new GoogleTokenStrategy({
    clientID: keys.googleAuth.clientID,
    clientSecret: keys.googleAuth.clientSecret
},
(accessToken, refreshToken, profile, done) => {
    User.upsertGoogleUser(accessToken, refreshToken, profile, (err, user) => {
        return done(err, user);
    });
})

passport.use(fbLogin);
passport.use(googleLogin);

/*const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userQueries = require('../queries/user');
const _ = require('lodash');*/

/*// Setup options for JWT Strategy
// ExtractJwt.fromAuthHeaderAsBearerToken()
//.fromAuthHeaderWithScheme('jwt')
//.fromHeader('authorization')
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: keys.jwtSecret
  };
// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, async (payload, done) => {
    // See if the user ID in the payload exists in our database
    // If it does, call 'done' with that other
    // otherwise, call done without a user object
    try{
        const user = await userQueries.getUser(payload.sub);
        if(user){
            done(null, user, {message: 'Logged In Successfully'});
        }
        else{
            done(null, false, {message: 'Incorrect email or password.'});
        }
    }catch(err){
        return done(err, false); 
    }
});

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, async (email, password, done) => {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne({ "email" : email } , (err, user) => {
    
    if (err) { return done(err); }
    if(!user){ return done(null, false, {errorMessage: 'Incorrect email or password.'}); }
    
    // compare passwords - is `password` equal to user.password?
    user.comparePassword(password, (err, isMatch) => {
        
        if (err) { return done(err); }
        if (!isMatch) { 
            return done(null, false, {errorMessage: 'Incorrect email or password.'}); 
        }        
        return done(null, user);
    });
  });
});

passport.use(jwtLogin);
passport.use(localLogin);*/

