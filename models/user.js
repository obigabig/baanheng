const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserSubInvestor = require('./userSubInvestor');

const userSchema = new Schema(
  {
    name: {
      type: String
      //required: [true, 'Name cannot be null?']
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },

    picture:{
        type: String,
    },

    role: {
      type: String,
      default: 'user'
    },

    userSubInvestors: [
      {
        type: Schema.Types.ObjectId,
        ref: 'userSubInvestor'
      }
    ],

    createDate: { type: Date, default: Date.now, timezone: 'Asia/Bangkok' }
  }
);

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;
