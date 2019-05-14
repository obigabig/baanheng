
const Authentication = require('../controllers/authentication');
const User = require('../controllers/user');
const requireAuth = require('../middleware/requireAuth');

module.exports = (app) => {
    app.get('/api/select/user-subInvestors', requireAuth, Authentication.selectUserSubInvestors);
    app.post('/api/createUserSubInvestor', requireAuth, User.createUserSubInvestor);    
    app.get('/api/updateUserSubInvestor', requireAuth, User.updateUserSubInvestor);

    app.get('/api/current-user', requireAuth, Authentication.getCurrentUser);
}
