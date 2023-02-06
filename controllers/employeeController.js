const express = require('express');
const mongoose = require('mongoose');
//const Employee = mongoose.model('Employee');
const Employee = require('../models/employee.model');

var router  = express.Router();

router.get('/', (req,res) => {
    res.render('employee/addOrEdit', {viewTitle:'Registration Form'});
});

router.post("/", (req, res) => {
    insertRecord(req,res);
});


//A function that will insert and save the record in the database
function insertRecord(req,res){
    var employee = new Employee();
    employee.fullname = req.body.fullname;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save()
        .then((doc) => {
            res.redirect('/thankyou');
            //console.log(doc)
        }); 
};

router.get('/thankyou', (req,res) =>{
    Employee.find().sort({_id:-1}).limit(1).then((docs)=> {
    res.render('employee/thankyou');
    console.log(docs);
    console.log(docs.fullname);
    });
    
});


router.get('/list', (req,res) => {
    Employee.find().then((docs)=> {
    //console.log(docs)
    res.render("employee/list", {list: docs});
    });
});


module.exports = router;
