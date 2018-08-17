
const Authentication = require('../controllers/authentication');
const User = require('../controllers/user');
const passport = require('passport');
//const requireAuth = passport.authenticate('jwt', { session: false });
//const requireSignin = passport.authenticate('local', { session: false });
const { generateToken, sendToken } = require('../utils/token.utils');


module.exports = (app, requireAuth) => {
    //app.post('/api/signup', Authentication.signup);
    //app.post('/api/signin', requireSignin, Authentication.signin);
    app.get('/api/select/user-subInvestors', requireAuth, Authentication.selectUserSubInvestors);
    app.post('/api/createUserSubInvestor', requireAuth, User.createUserSubInvestor);    
    app.get('/api/updateUserSubInvestor', requireAuth, User.updateUserSubInvestor);

    app.get('/api/current-user', requireAuth, Authentication.getCurrentUser);
    app.post('/api/auth/facebook'
        , passport.authenticate('facebook-token', {session: false})
        , Authentication.getAuthenticateUser
        , generateToken
        , sendToken);

    app.post('/api/auth/google'
        , passport.authenticate('google-token', {session: false})
        , Authentication.getAuthenticateUser
        , generateToken
        , sendToken);
    };
