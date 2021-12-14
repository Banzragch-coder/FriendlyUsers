module.exports = (app) => {
  const contacts = require("../controllers/contact.controller");

  var router = require("express").Router();

  router.post("/", contacts.create);

  router.get("/", contacts.findAll);
  // router.post("/", contacts.findAll);

  router.get("/:id", contacts.findAllByPhone);

  // router.get("/:id", contacts.findOne);

  // router.post("/:id", contacts.findOne);

  // router.put("/:id", contacts.update);

  // router.delete("/:id", contacts.delete);

  app.use("/api/contacts", router);
};
