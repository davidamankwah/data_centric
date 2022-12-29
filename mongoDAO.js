const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017')
.then((client) => {
db = client.db('employeeDB')
coll = db.collection('employee')
})
.catch((error) => {
console.log(error)
})

var addEmployee = function(_id, phone, email) {
    return new Promise((resolve, reject) => {

    //insert id, phone, email
    coll.insertOne({"_id ":_id,"phone ":phone,"email ":email})
    .then((documents) => {
    resolve(documents)
    })
    .catch((error) => {
    reject(error)
    })
    })
    }

    //find all
    var findEmployees = function() {
        return new Promise((resolve, reject) => {
        var cursor = coll.find()
        cursor.toArray()
        .then((documents) => {
        resolve(documents)
        })
        .catch((error) => {
        reject(error)
        })
        })
    }
    
module.exports = {addEmployee, findEmployees}