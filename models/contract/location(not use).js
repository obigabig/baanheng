const mongoose = require('mongoose');
const { Schema } = mongoose;

//subdocument
const locationSchema = new Schema({
    coordinates: { type: [Number], index: '2dsphere' },
    type: { type: String, default: 'Point' }
});

module.exports = locationSchema;

