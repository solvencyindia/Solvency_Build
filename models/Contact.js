const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    order_id: {type: String},
    name: {type: String, required: true},
    email: {type: String, required: true},
    message: {type: String, required: true},
    date: {type: Date, default: Date.now}
});

module.exports = Contact = mongoose.model("Contact", ContactSchema);