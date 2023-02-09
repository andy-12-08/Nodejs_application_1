const express = require('express');
const mongoose = require('mongoose');
//const Employee = mongoose.model('Employee');
const Employee = require('../models/employee.model');

var router  = express.Router();

router.get('/', (req,res) => {
    res.render('employee/addOrEdit', {viewTitle:'Registration Form'});
});


router.get('/thankyou', (req,res) => {
    res.render('employee/thankyou');
    Employee.find().sort({_id:-1}).limit(1).then((docs)=> {
        //console.log(docs);
    });

});

router.get('/list', (req,res) => {
    Employee.deleteMany({"fullname": null}).then(() => {
        //console.log("deleted empty record");
        Employee.find().then((docs) => {
            //console.log(docs);
            res.render("employee/list", {list: docs});
            });
    });
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
    employee.save((err, doc)=>{
        if (!err)
            res.redirect('/list');
        else {
            console.log(err);
        };
    });
};

router.get('/:id', (req,res) =>{
    Employee.findOne(req.params._id).then(docs =>{
        res.render("employee/addOrEdit",{viewTitle:"Update", employee:docs});
    });
});

module.exports = router;
