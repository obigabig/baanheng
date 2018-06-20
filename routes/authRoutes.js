//const passportService = require('../services/passport');
const passport = require('passport');
const Authentication = require('../controllers/authentication');

//return true/false
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = app => {
    app.post('/api/signup', Authentication.signup);
    app.post('/api/signin', requireSignin, Authentication.signin);
    app.get('/api/current-user', requireAuth, Authentication.currentUser);
};
