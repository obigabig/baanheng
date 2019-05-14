const mongoose = require('mongoose');
const { Schema } = mongoose;

const subInvestorSchema = new Schema({
    _userSubInvestor: {   
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'userSubInvestor'
    },    
    value: { 
        type: Number,
        required: [true, "no subInvestorSchema values."]
    }
});

/*const ModelClass = mongoose.model('subInvestor', subInvestorSchema);*/
module.exports = subInvestorSchema;