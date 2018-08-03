const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name cannot be null?']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    local: {
        email: { type: String, unique: true, lowercase: true },
        password: String,
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
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

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
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
    console.log(this.local.password)
    bcrypt.compare(candidatePassword, this.local.password, function(err, isMatch) {

      if (err) { return callback(err); }
  
      callback(null, isMatch);
    });
  }
  
  // Create the model class
  const ModelClass = mongoose.model('user', userSchema);
  
  // Export the model
  module.exports = ModelClass;