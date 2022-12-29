var pmysql = require('promise-mysql');
var pool;

//pool
pmysql.createPool({
    connectionLimit: 3,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proj2022'
})
    .then(p => {
        pool = p
    })
    .catch(e => {
        console.log("pool error:" + e)
    })
    
//function to delete department
    var deletesDept = function () {
        var myQuery = {
            sql: 'Delete FROM dept WHERE did = ?',
            value: [did]
            }
            pool.query(myQuery)
            .then((data) => {
            console.log(data)
            })
            .catch(error => {
            console.log(error)
            })
    }

//function to display employee
var getEmployee = function () {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM employee')
            .then((data) => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

//function to display department
var getDepartments = function () {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM dept')
            .then((data) => {
                resolve(data)
            })
            .catch(error => {
                reject(error)
            })
    })

    
}

module.exports = { getEmployee, getDepartments,deletesDept}