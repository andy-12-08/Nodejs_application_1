require('./models/db');

const express = require('express');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const path = require('path');

//a path to static files
const publicPath = path.join(__dirname, '/views/');

const employeeController = require('./controllers/employeeController');

//include  the request statement for thr body-parser package
const bodyparser = require('body-parser');

var app = express();

//set view engine

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs.engine({ extname: 'hbs', defaultLayout: 'mainLayout', handlebars: allowInsecurePrototypeAccess(Handlebars), layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', 'hbs');

//some 'use' middle-wares

//making use of static files in the view folder
app.use('/', express.static(publicPath));

//include the form data inside the req parameter
app.use(bodyparser.urlencoded({
    extended:true
}));

//convert the data into a JSON 
app.use(bodyparser.json());




app.listen(8080, () => {
    console.log('Express server started at port: 3000')
});


app.use('/', employeeController);