const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");
const Contact = require("./contact.model.js");
// const User = require("./user.model.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

// open the MySQL connection
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected database.");
});

module.exports = connection;
// ----------------------------------------------
// const pool = mysql.createPool({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB,
// });

// pool.query('SELECT * FROM contacts Where phone ="89110001" ', (err, res) => {
//   return console.log(res);
// });
