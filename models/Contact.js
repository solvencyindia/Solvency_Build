const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");

const ContactSchema = new Schema({
    order_id: {
		type: Number,
		required:true,
		unique:true
	},
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

autoIncrement.initialize(mongoose.connection);
ContactSchema.plugin(autoIncrement.plugin, {
  model: "Contact", // collection or table name in which you want to apply auto increment
  field: "order_id", // field of model which you want to auto increment
  startAt: 1, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

module.exports = Contact = mongoose.model("Contact", ContactSchema);