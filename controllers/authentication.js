const User = require('../models/user');
const UserSubInvestor = require('../models/userSubInvestor');
const _ = require('lodash');

exports.getCurrentUser = async (req, res) => {
  try {

    // Get user detail   
      const existingUser = await User.findOne({email : req.user.email})
      .populate('userSubInvestors')
      .exec();

    if (existingUser) {
      res.send(existingUser);
    } else {
      //If not found create a new one.
      let user, userSubInvestors;
      user = new User({
        name: req.user.name,
        email: req.user.email,
        picture: req.user.picture,
        role: 'user'
      });
      
      userSubInvestors = new UserSubInvestor({ name: req.user.name, isDefault: true });
      user.userSubInvestors.push(userSubInvestors);

      await userSubInvestors.save();
      await user.save();

      res.send(user);
    }
  } catch (e) {
    
    console.log(e,'\n\n')
    res.status(422).send({ error: e });
  }
};

exports.selectUserSubInvestors = async (req, res, next) => {
  const email = req.user.email;
  try {
    const existingUser = await User.findOne({ email: email })
      .select('userSubInvestors')
      .populate('userSubInvestors')
      .exec();

    // If a user with email does exist, return an error
    if (!existingUser) {
      return res
        .status(422)
        .send({ error: 'User sub investors is not found.' });
    }

    //send output in react-select format
    res.send(
      _.map(existingUser.userSubInvestors, ({ _id, name }) => {
        return { value: _id, label: name };
      })
    );
  } catch (err) {
    return next(err);
  }
};
