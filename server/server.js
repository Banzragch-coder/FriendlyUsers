const express = require("express");
const cors = require("cors");
const app = express();
const axios = require("axios");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

require("crypto").randomBytes(64).toString("hex");

function generateAccessToken(username) {
  console.log("Token phone=====>", username);
  return jwt.sign(
    { username: username },
    "09f26e402586e2faa8da4c98a35f1b20d6b033c60",
    {
      issuer: "friendlyusers.uni",
      expiresIn: "1h",
    }
  );
}
// ---------------table---------------------------------------------------

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./app/routes/contact.routes.js")(app);
app.get("/", (req, res) => {
  res.json({ message: "Welcome =================>" });
});

app.use(express.text());
app.use(express.json());

const cryptkey = "N9gTl00eJy4EsmfT";
const iv = "WW25vx4vjP+h+bBC";
function encrypt(text) {
  try {
    var cipher = crypto.createCipheriv("aes-128-cbc", cryptkey, iv);
    var crypted = cipher.update(text, "utf8", "base64"); //base64 , hex
    crypted += cipher.final("base64");
    return crypted;
  } catch (err) {
    console.error("encrypt error", err);
    return null;
  }
}

function decrypt(text) {
  try {
    const decipher = crypto.createDecipheriv("aes-128-cbc", cryptkey, iv);
    const decrpyted = Buffer.concat([
      decipher.update(text, "base64"),
      decipher.final(),
    ]);
    ans = decrpyted.toString();
    console.log("answer=========>", ans);
    return ans;
  } catch (error) {
    throw error;
  }
}

app.post("/", (req, res) => {
  body = req.body;
  console.log(body);
  s = encrypt(JSON.stringify(body));
  login(s).then(
    (ans) => {
      res.setHeader("Content-Type", "application/json");
      console.log("=================>", ans);

      res.end(generateAccessToken(JSON.parse(ans).phone));
    },
    () => res.json("{}")
  );
});

async function login(text) {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "text/plain");
  var request = require("request");
  var options = {
    method: "POST",
    url: "http://10.21.64.231:7070/login",
    headers: {
      "Content-Type": "text/plain",
    },
    body: text,
  };
  ans = "";
  return new Promise(function (resolve, reject) {
    request(options, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(decrypt(body));
      } else {
        reject(error);
      }
    });
  });
}

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server aslaa ${PORT}. port`);
});
