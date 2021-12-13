const express = require("express");
const cors = require("cors");
// const http = require("http");
// const fs = require("fs");
// const urlLib = require("url");
// const path = require("path");
const app = express();
// ---------------table---------------------------------------------------
var corsOptions = {
  origin: "http://localhost:3001/#/contact",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome =================>" });
});

require("./app/routes/contact.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server aslaa ${PORT}. port`);
});
