const Contact = require("../models/contact.model");

// --------------------------------------------------------------- jwt ---------------------------------------------------------------------------

function parseJwt(token) {
  console.log(token);
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

// ---------------------------------------------------------------- API ---------------------------------------------------------------------------

exports.findPhone = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);
  var user = parseJwt(token);
  console.log(user);
  phone = user.username;
  console.log("Find all phoneee====>", phone);
  Contact.getNumbers(phone, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || " Харилцагчдыг сэргээх явцад алдаа гарлаа.",
      });
    else res.send(data);
  });
};

exports.create = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  var user = parseJwt(token);
  console.log(user);
  phone = user.username;
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

exports.update = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  var user = parseJwt(token);
  console.log(user);
  phone = user.username;

  console.log("reeeeeeeeeeqq", req.body);
  var err;
  var data;
  for (let index = 0; index < Object.keys(req.body).length; index++) {
    console.log("contacts" + req.body[index].id);
    var contact = new Contact({
      family_who: req.body[index].family_who,
      family_phone: req.body[index].family_phone || false,
    });
    Contact.updateById(req.body[index].id, contact, (err, data) => {});
    err = err;
    data = data;
  }
  if (err) {
    if (err.kind === "not_found") {
      res.status(403).send({
        message: ` ${req.params.id} ID-тай харилцагч олдсонгүй`,
      });
    } else {
      res.status(500).send({
        message: req.params.id + "id-тай харилцагчийг шинэчлэхэд алдаа гарлаа",
      });
    }
  } else {
    res.send(data);
  }
};

exports.delete = (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  var user = parseJwt(token);
  console.log(user);
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
