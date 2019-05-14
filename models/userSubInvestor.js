const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSubInvestorSchema = new Schema({    
    name: {type: String, required: [true, 'userSubInvestors cannot be null?']},
    isDefault: {type: Boolean, default: false}
});

/*userSubInvestorSchema.pre('save', function (next) {
    var self = this;
    UserModel.find({name : self.name}, function (err, docs) {
        if (!docs.length){
            next();
        }else{                
            console.log('user exists: ',self.name);
            next(new Error("User exists!"));
        }
    });
}) ;*/

// Create the model class
const ModelClass = mongoose.model('userSubInvestor', userSubInvestorSchema);

// Export the model
module.exports = ModelClass;