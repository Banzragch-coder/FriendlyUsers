module.exports = (app) => {
  const contacts = require("../controllers/contact.controller");

  var router = require("express").Router();

  router.get("/phone", contacts.findPhone);

  router.post("/phone", contacts.create);

  router.put("/phone", contacts.update);

  router.delete("/phone/:id", contacts.delete);

  app.use("/api/contacts", router);
};
