var express = require('express') 
var app = express();
var bodyParser = require('body-parser')
var mongoDAO = require('./mongoDAO');
let ejs = require('ejs');
app.set('view engine', 'ejs')
const { check, validationResult } = require('express-validator');
var mySQLDAO = require('./mySQLDAO');


app.use(bodyParser.urlencoded({ extended: false }))

//route path to home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/views/home.html");
})
//MongoDB
//route path to display employee DB
app.get('/employeeDB', (req, res) => {

    mongoDAO.findEmployees()
        .then((data) => {

         res.render('employeesDbs',{emply:data})

        })
        .catch((error) => {

            res.send(error)

        })

});

//add employee to mongodb
app.post('/addEmployeeDB',(req, res) => {
    mongoDAO.addEmployee(req.body._id, req.body.phone, req.body.email)
    .then((data) => {
        res.redirect("/employeeDB") //redirect employeedb url
    })
    .catch((error) => {
        res.send(error)
    })
})

//display added employeedb
app.get('/addEmployeeDB', (req, res) => {
    res.render("addEmployeeDB")
})

//SQL
//display department
app.get('/department', (req, res) => {
    mySQLDAO.getDepartments()
    .then((data) => {
    // Display data using EJS
    res.render('departments',{depts:data})
    })
    .catch((error) => {
    // Handle error
    res.send(error)
    })
})

//supposed to have deleted department
app.get('/department/deletes:did', (req, res) => {

    mySQLDAO.deletesDept(req.params.did)
    .then((data) => {
    res.send(req.params.did)
    })
    .catch((error) => {
    // Handle error
    res.send(error)
    })
 
})

//display employee from sql
app.get('/employees', (req, res) => {
    mySQLDAO.getEmployee()
    .then((data) => {
    // Display data using EJS
    res.render('employeess',{employe:data})
    })
    .catch((error) => {
    // Handle error
    res.send(error)
    })
    })


//Connect port 3004
app.listen(3004, () => {
    console.log("Server is listening on port 3004")
})