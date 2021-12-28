const express = require("express");
const cors = require("cors");
const app = express();
require("crypto").randomBytes(64).toString("hex");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./app/routes/contact.routes.js")(app);

const PORT = process.env.PORT || 6712;
app.listen(PORT, () => {
  console.log(`Server aslaa ${PORT}. port`);
});
