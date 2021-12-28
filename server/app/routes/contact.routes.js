module.exports = (app) => {
  const contacts = require("../controllers/contact.controller");

  var router = require("express").Router();

  router.get("/phone", contacts.findPhone);

  // router.post("/phone", contacts.create);

  router.post("/login", contacts.login);

  router.put("/phone/:id", contacts.updateId);

  router.post("/phone", contacts.create);

  router.delete("/phone/:id", contacts.delete);

  app.use("/api/contacts", router);
};
