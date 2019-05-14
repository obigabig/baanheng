const mongoose = require('mongoose');
const ActionSchema = require('./contractAction');
const DebtorSchema = require('./contractDebtor');
const SubInvestorSchema = require('./contractSubInvestor');

const { Schema } = mongoose;

const contractSchema = new Schema({
  no: { type: Number, required: [true, 'no contract no.'] },
  title: { type: String, required: [true, 'no title'] },
  description: String,
  status: { type: String, required: [true, 'no status'] },
  type: { type: String, required: [true, 'no type'] },
  pact: { type: String, required: [true, 'no pact'] },
  value: { type: Number, required: [true, 'no value'] },
  beginDate: { type: String },
  closeDate: { type: String },
  _signBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userSubInvestor'
  },
  googleMapsUrl: String,
  _agent: { type: String, required: [true, 'no createBy'] },
  subInvestor: [SubInvestorSchema],
  actions: [ActionSchema],
  debtor: [DebtorSchema],
  _createBy: { type: String, required: [true, 'no createBy'] },
  createDate: { type: Date, default: Date.now, timezone: 'Asia/Bangkok' },
  _modifiedBy: { type: String },
  modifiedDate: Date
});

// Create the model class
const ModelClass = mongoose.model('contract', contractSchema);

// Export the model
module.exports = ModelClass;
