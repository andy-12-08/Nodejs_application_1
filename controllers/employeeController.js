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
    if(req.body._id == "")
        insertRecord(req,res);
    else
        updateRecord(req,res);
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

function updateRecord(req,res){
    Employee.findOneAndUpdate({_id:req.body._id}, req.body, {new: true}, (doc) => {
        res.redirect('/list');
    });
};


router.get('/:id', (req,res) =>{
    Employee.findById(req.params.id).then(docs =>{
        res.render("employee/addOrEdit",{viewTitle:"Update", employee:docs});
    });
});


router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id).then(docs => {
        res.redirect('/list');
    });
});

module.exports = router;
