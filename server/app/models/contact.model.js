const { query } = require("express");
const { createPool } = require("mysql");
const sql = require("./db.js");

// constructor
const Contact = function (contact) {
  this.phone = contact.phone;
  this.family_who = contact.family_who;
  this.family_phone = contact.family_phone;
};

Contact.getNumbers = (phone, result) => {
  let query = "SELECT * FROM contacts ";
  if (phone) {
    query += ` WHERE phone LIKE '%${phone}%'`;
  } else query += ' WHERE phone like " + phone';

  console.log("Phoneee ====", query);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

Contact.create = (newContact, result) => {
  console.log(newContact);
  var query =
    "INSERT INTO contacts (phone,family_who,family_phone) values  ('" +
    newContact.phone +
    "','" +
    newContact.family_who +
    "','" +
    newContact.family_phone +
    "')";
  console.log(query);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created contact: ", { id: res.insertId, ...newContact });
    result(null, { id: res.insertId, ...newContact });
  });
};

Contact.remove = (id, result) => {
  console.log(id);
  var query = "DELETE FROM contacts WHERE id = '" + id + "'";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Contact with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted contact with id: ", query);
    result(null, res);
  });
};
// ------------------------------------------------------UPDATE DATA---------------------------------
Contact.updateById = (id, contact, result) => {
  console.log("UPDATE ====" + id, " Contact====" + contact);

  var query =
    "UPDATE contacts SET  family_who = '" +
    contact.family_who +
    "', family_phone = '" +
    contact.family_phone +
    "' WHERE id = '" +
    id +
    "'";
  console.log("queryyyyyyyyy", query);
  // sql.query(query);
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Contact with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("updated contact: ", { id: id, query });
    result(null, { id: id, ...contact });
    return;
  });
};

module.exports = Contact;
