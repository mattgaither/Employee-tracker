const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: "localhost",
  user: "user",
  password: process.env.db_password,
  database: employee_db
},
console.log("Connected to the database!")
);

module.exports = db;