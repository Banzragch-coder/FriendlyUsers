const { createPool } = require("mysql");
const sql = require("./db.js");

// constructor
const Contact = function (contact) {
  this.phone = contact.phone;
  this.family_who = contact.family_who;
  this.family_phone = contact.family_phone;
};

// const Contact = function (contact) {
// };

Contact.create = (newContact, result) => {
  sql.query("INSERT INTO contacts SET ?", newContact, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created contact: ", { id: res.insertId, ...newContact });
    result(null, { id: res.insertId, ...newContact });
  });
};

findAllByPhone = (id, result) => {
  sql.query(`SELECT * FROM contacts WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found contact: ", res[0]);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
};

Contact.getAll = (phone, result) => {
  let query = "SELECT * FROM contacts";
  if (phone) {
    query += `WHERE phone LIKE '%${phone}%'`;
  }
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("contacts: ", res);
    result(null, res);
  });
};

Contact.getAllFamily_phone = (result) => {
  sql.query("SELECT * FROM contacts WHERE family_phone=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("contacts: ", res);
    result(null, res);
  });
};

Contact.updateById = (id, contact, result) => {
  sql.query(
    "UPDATE contacts SET phone = ?, family_who = ?, family_phone = ? WHERE id = ?",
    [contact.phone, contact.family_who, contact.family_phone, id],
    (err, res) => {
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
      console.log("updated contact: ", { id: id, ...contact });
      result(null, { id: id, ...contact });
    }
  );
};

Contact.remove = (id, result) => {
  sql.query("DELETE FROM contacts WHERE id = ?", id, (err, res) => {
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
    console.log("deleted contact with id: ", id);
    result(null, res);
  });
};

Contact.removeAll = (result) => {
  sql.query("DELETE FROM contacts", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log(`deleted ${res.affectedRows} contacts`);
    result(null, res);
  });
};

module.exports = Contact;

// pool.query('select * from contacts where phone=""');

// SELECT family_who FROM contacts
// SELECT * FROM contacts Where phone = "";
// UPDATE contacts SET family_who ="", family_phone="" WHERE phone="";
// SELECT * FROM contacts WHERE phone="" LIMIT 10;
