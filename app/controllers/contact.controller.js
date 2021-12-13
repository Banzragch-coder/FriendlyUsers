const Contact = require("../models/contact.model");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Агуулга хоосон байж болохгүй!",
    });
  }

  const contact = new Contact({
    phone: req.body.phone,
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

exports.findAll = (req, res) => {
  const phone = req.query.phone;
  Contact.getAll(phone, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || " Харилцагчдыг сэргээх явцад алдаа гарлаа.",
      });
    else res.send(data);
  });
};

exports.findAllByPhone = (req, res) => {
  const phone = req.params.id;

  console.log(phone);

  Contact.getAll(phone, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || " Харилцагчдыг сэргээх явцад алдаа гарлаа.",
      });
    else res.send(data);
  });
};

exports.findOne = (req, res) => {
  Contact.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `${req.params.id}ID-тай харилцагч олдсонгүй`,
        });
      } else {
        res.status(500).send({
          message:
            +req.params.id + "id-тай харилцагчийг олж авахад алдаа гарлаа",
        });
      }
    } else res.send(data);
  });
};

exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Агуулга хоосон байж болохгүй!",
    });
  }

  console.log(req.body);

  Contact.updateById(req.params.id, new Contact(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: ` ${req.params.id} ID-тай харилцагч олдсонгүй`,
        });
      } else {
        res.status(500).send({
          message:
            req.params.id + "id-тай харилцагчийг шинэчлэхэд алдаа гарлаа",
        });
      }
    } else res.send(data);
  });
};

exports.delete = (req, res) => {
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

exports.deleteAll = (req, res) => {
  Contact.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Бүх харилцагчийг устгах явцад алдаа гарлаа.",
      });
    else res.send({ message: `Бүх харилцагчдыг амжилттай устгалаа!` });
  });
};
