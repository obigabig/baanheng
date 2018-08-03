const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSubInvestorSchema = new Schema({    
    name: {type: String, required: [true, 'userSubInvestors cannot be null?']},
    isDefault: {type: Boolean, default: false}
});

// Create the model class
const ModelClass = mongoose.model('userSubInvestor', userSubInvestorSchema);

// Export the model
module.exports = ModelClass;