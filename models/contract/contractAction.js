const mongoose = require('mongoose');
const { Schema } = mongoose;

const actionSchema = new Schema({
    type: {
        type: String,
        required: [true, ' action require type.']
    },
    description: {
        type: String
    },
    dueDate: {
        type: String,
        required: [true, ' action require dueDate.']
    },
    isCompleted: {
        type: Boolean,
        default: function() {
            return false;
          }
    }
});

module.exports = actionSchema;