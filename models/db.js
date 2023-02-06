// Database connection
const mongoose = require('mongoose');
const dbURI = 'mongodb+srv://andrew2:Andy1994@project1cluster.i4ys7fc.mongodb.net/firstapplication?retryWrites=true&w=majority'
mongoose.set('strictQuery', true);
mongoose.connect(dbURI);

//add a request statement for the employee model inside this db.js file
const Employee = require('./employee.model');
