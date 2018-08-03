const User = require('../models/user');

exports.getUser = (condition) => { 
    return User.findById(condition)
        .populate('userSubInvestors')
        .select('local.email isAdmin name')
        .exec();
}