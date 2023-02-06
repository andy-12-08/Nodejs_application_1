//request statement for mongoose with the constant named as mongoose
const mongoose = require('mongoose');

//create an object for the employee schema
//create the constructor for the employee schema

var employeeSchema = new mongoose.Schema({
    fullname:{
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    city: {
        type:String
    }
});

//register this employee schema inside mongoose
const Employee = mongoose.model('employee', employeeSchema);
module.exports = Employee;