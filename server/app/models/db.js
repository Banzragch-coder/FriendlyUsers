const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");
const Contact = require("./contact.model.js");
// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  multipleStatements: true,
});

// open the MySQL connection
// connection.connect((error) => {
//   if (error) throw error;
//   console.log("Successfully connected database.");

// });

function handleDisconnect(connection) {
  connection.on("error", function (err) {
    if (!err.fatal) {
      return;
    }
    if (err.code !== "PROTOCOL_CONNECTION_LOST") {
      throw err;
    }
    console.log("Re-connecting lost connection: " + err.stack);

    connection = mysql.createConnection(connection.config);
    handleDisconnect(connection);
    connection.connect();
  });
}
handleDisconnect(connection);
module.exports = connection;
