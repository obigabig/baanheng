const mongoose = require('mongoose');
const { Schema } = mongoose;

const debtorSchema = new Schema({
    name: String,
    tel: String,
    remark: String
});

module.exports = debtorSchema;