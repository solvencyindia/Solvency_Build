const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeesSchema = new Schema({
    Emp_Id: {type: String},
    Emp_Name: {type: String},
    Designation: {type: String},
    Emp_Phone: {type: String},
    Emp_Email: {type: String},
    Emp_Address: {type: String}
});

module.exports = employees = mongoose.model("employees", EmployeesSchema);