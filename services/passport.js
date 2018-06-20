const passport = require('passport');
const User = require('../models/user');
const keys = require('../config/keys/keys');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local');
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Setup options for JWT Strategy
// ExtractJwt.fromAuthHeaderAsBearerToken()
//.fromAuthHeaderWithScheme('jwt')
//.fromHeader('authorization')
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: keys.jwtSecret
  };
// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    // See if the user ID in the payload exists in our database
    // If it does, call 'done' with that other
    // otherwise, call done without a user object
    User.findById(payload.sub, (err, user) => {
        if(err) { return done(err, false); }
        if (user){
            done(null, user, {message: 'Logged In Successfully'});
        }
        else{
            done(null, false, {message: 'Incorrect email or password.'});
        }
    });
});

// Create local strategy
const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne({ "local.email" : email } , (err, user) => {
    
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
passport.use(localLogin);