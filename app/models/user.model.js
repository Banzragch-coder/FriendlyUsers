// const { createPool } = require("mysql");
// const sql = require("./db.js");

// const User = function (user) {
//   this.name = user.name;
//   this.pass = user.pass;
// };

// Contact.findByUser = (id, result) => {
//   sql.query(`SELECT * FROM contacts WHERE id = ${id}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("found contact: ", res[0]);
//       result(null, res[0]);
//       return;
//     }

//     // not found Contact with the id
//     result({ kind: "not_found" }, null);
//   });
// };
