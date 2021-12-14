const express = require("express");
const cors = require("cors");
const app = express();

// ---------------table---------------------------------------------------
var corsOptions = {
  origin: "http://localhost:3001/#/contact",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./app/routes/contact.routes.js")(app);

app.get("/", (req, res) => {
  res.json({ message: "Welcome =================>" });
});

// app.post();

// app.post("/api/login", (req, res) => {
//   const { username, password } = req.body;
//   const values = [username, password];
//   var connection = mysql.createConnection(credentials);
//   connection.query(
//     "SELECT * FROM login WHERE username = ? AND password = ?",
//     values,
//     (err, result) => {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         if (result.length > 0) {
//           res.status(200).send({
//             id: result[0].id,
//             user: result[0].user,
//             username: result[0].username,
//           });
//         } else {
//           res.status(400).send("Usuario no existe");
//         }
//       }
//     }
//   );
//   connection.end();
// });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server aslaa ${PORT}. port`);
});
