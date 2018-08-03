
const Authentication = require('../controllers/authentication');
const User = require('../controllers/user');

module.exports = (app, requireAuth, requireSignin) => {
    app.post('/api/signup', Authentication.signup);
    app.post('/api/signin', requireSignin, Authentication.signin);
    app.get('/api/current-user', requireAuth, Authentication.currentUser);
    app.get('/api/select/user-subInvestors', requireAuth, Authentication.selectUserSubInvestors);
    app.post('/api/createUserSubInvestor', requireAuth, User.createUserSubInvestor);
};
