const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSubInvestor = require('./userSubInvestor')
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        //required: [true, 'Name cannot be null?']
    },
    
    email: {
        type: String, required: true,
        trim: true, unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    facebookProvider: {
        type: {
            id: String,
            token: String
        },
        select: false //we exclude facebookProvider field in result of queries by default
    },
    googleProvider: {
        type: {
            id: String,
            token: String
        },
        select: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    userSubInvestors : [{   
        type: Schema.Types.ObjectId, 
        ref: 'userSubInvestor'
    }],
    createDate: { type: Date, 
        default:Date.now,
        timezone: 'Asia/Bangkok'
    }
});

userSchema.set('toJSON', {getters: true, virtuals: true});

//In UserSchema we have to add one static method 
//that will be used for creating a new user if user doesn’t exist already.
userSchema.statics.upsertFbUser = function(accessToken, refreshToken, profile, cb) {
    var that = this;
    return this.findOne({
          'facebookProvider.id': profile.id
    }, function(err, user) {
      // no user was found, lets create a new one
      if (!user) {
            const newUser = new that({
                  name: `${profile.name.givenName} ${profile.name.familyName}`,
                  email: profile.emails[0].value,
                  facebookProvider: {
                        id: profile.id,
                        token: accessToken
                  }
            });
            const userSubInvestors = new UserSubInvestor({
                name: `${profile.name.givenName} ${profile.name.familyName}`, 
                isDefault: true
            });
            newUser.userSubInvestors.push(userSubInvestors);            
            userSubInvestors.save((error, savedUserSubInvestors) => {
                if (error) {
                    console.log(error);
                }
                newUser.save((error, savedUser) => {
                    if (error) {
                          console.log(error);
                    }
                    return cb(error, savedUser);
                });
            })
      } else {
            return cb(err, user);
      }
    });
  };

  userSchema.statics.upsertGoogleUser = function(accessToken, refreshToken, profile, cb) {
    var that = this;

    return this.findOne({
        'googleProvider.id': profile.id
    }, function(err, user) {
        // no user was found, lets create a new one
        if (!user) {            
            const newUser = new that({
                name: `${profile.name.givenName} ${profile.name.familyName}` ,
                email: profile.emails[0].value,
                googleProvider: {
                    id: profile.id,
                    token: accessToken
                }
            });
            const userSubInvestors = new UserSubInvestor({
                name: `${profile.name.givenName} ${profile.name.familyName}`, 
                isDefault: true
            });
            newUser.userSubInvestors.push(userSubInvestors);            
            userSubInvestors.save((error, savedUserSubInvestors) => {
                if (error) {
                    console.log(error);
                }
                newUser.save((error, savedUser) => {
                    if (error) {
                            console.log(error);
                    }
                    return cb(error, savedUser);
                });
            })
        } else {
            return cb(err, user);
        }
    });
};

  // Create the model class
  const ModelClass = mongoose.model('user', userSchema);
  
  // Export the model
  module.exports = ModelClass;


//---------------------------[JWT local password]------------------------------------//
  // On Save Hook, encrypt password
// Before saving a model, run this function
/*userSchema.pre('save', function(next) {
    // get access to the user model
    const user = this;
    // generate a salt then run callback
    bcrypt.genSalt(10, function(err, salt) {
      if (err) { return next(err); }    
      
      // hash (encrypt) our password using the salt
      bcrypt.hash(user.local.password, salt, function(err, hash) {
        if (err) { return next(err); }
  
        // overwrite plain text password with encrypted password
        user.local.password = hash;
        next();
      });
    });
  });
              
  userSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.local.password, function(err, isMatch) {

      if (err) { return callback(err); }
  
      callback(null, isMatch);
    });
  }*/