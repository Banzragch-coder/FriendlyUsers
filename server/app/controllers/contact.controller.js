const Contact = require("../models/contact.model");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
require("crypto").randomBytes(64).toString("hex");
global.atob = require("atob");
// --------------------------------------------------------------- jwt ---------------------------------------------------------------------------

function parseJwt(token) {
  // console.log(token);
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}
function generateAccessToken(username) {
  // console.log("Token phone=====>", username);
  return jwt.sign(
    { username: username },
    "09f26e402586e2faa8da4c98a35f1b20d6b033c60",
    {
      issuer: "friendlyusers.uni",
      expiresIn: "1h",
    }
  );
}

// ---------------------------------------------------------------- API ---------------------------------------------------------------------------

exports.findPhone = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);
  var user = parseJwt(token);
  // console.log(user);
  phone = user.username;
  // console.log("Find all phoneee====>", phone);
  Contact.getNumbers(phone, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || " Харилцагчдыг сэргээх явцад алдаа гарлаа.",
      });
    else res.send(data);
  });
};
exports.login = (req, res) => {
  body = req.body;
  s = encrypt(JSON.stringify(body));
  login(s).then(
    (ans) => {
      res.setHeader("Content-Type", "application/json");
      // console.log("=================>", ans);
      msg = JSON.parse(ans).msg;
      if (msg !== "Success") {
        return res.sendStatus(401);
      }

      res.end(generateAccessToken(JSON.parse(ans).phone));
    },
    () => res.sendStatus(401)
  );
};

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
    // console.log("answer=========>", ans);
    return ans;
  } catch (error) {
    throw error;
  }
}
async function login(text) {
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

exports.create = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  var user = parseJwt(token);
  // console.log(user);
  phone = user.username;
  // console.log("req-body", req);
  const contact = new Contact({
    phone: user.username,
    family_who: req.body.family_who,
    family_phone: req.body.family_phone || false,
  });
  Contact.create(contact, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Харилцагчийг үүсгэх явцад алдаа гарлаа. ",
      });
    else res.send(data);
  });
};

// exports.update = (req, res) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) return res.sendStatus(401);
//   var user = parseJwt(token);
//   // console.log(user);
//   // console.log("reeeeeeeeeeqq", req.body);
//   phone = user.username;
//   var err;
//   var data;
//   for (let index = 0; index < Object.keys(req.body).length; index++) {
//     // console.log("contacts" + req.body[index].id);
//     var contact = new Contact({
//       family_who: req.body[index].family_who,
//       family_phone: req.body[index].family_phone || false,
//     });
//     Contact.updateById(req.body[index].id, contact, (err, data) => {});
//     err = err;
//     data = data;
//   }
//   if (err) {
//     if (err.kind === "not_found") {
//       res.status(403).send({
//         message: ` ${req.params.id} ID-тай харилцагч олдсонгүй`,
//       });
//     } else {
//       res.status(500).send({
//         message: req.params.id + "id-тай харилцагчийг шинэчлэхэд алдаа гарлаа",
//       });
//     }
//   } else {
//     res.send(data);
//   }
// };

exports.updateId = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  var user = parseJwt(token);
  phone = user.username;
  const contact = new Contact({
    phone: user.username,
    family_who: req.body.family_who,
    family_phone: req.body.family_phone || false,
  });
  console.log(req.body);
  Contact.updateById(req.body.id, contact, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: ` ${req.params.id} ID-тай харилцагч олдсонгүй`,
        });
      } else {
        res.status(500).send({
          message: req.params.id + "ID-тай харилцагчийг шинэчилж чадсангүй",
        });
      }
    } else res.send({ message: `харилцагчийг амжилттай шинэчлэгдлээ!` });
  });
};

exports.delete = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  var user = parseJwt(token);
  // console.log(user);
  phone = user.username;
  const contact = new Contact({
    phone: user.username,
    family_who: req.body.family_who,
    family_phone: req.body.family_phone || false,
  });
  Contact.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: ` ${req.params.id} ID-тай харилцагч олдсонгүй`,
        });
      } else {
        res.status(500).send({
          message: req.params.id + "ID-тай харилцагчийг устгаж чадсангүй",
        });
      }
    } else res.send({ message: `харилцагчийг амжилттай устгалаа!` });
  });
};
