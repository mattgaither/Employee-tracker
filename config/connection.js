const mysql = require('mysql2')

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "LG1026mg",
  database: "employee_db",
},
console.log("Connected to the database!")
);

module.exports = db;