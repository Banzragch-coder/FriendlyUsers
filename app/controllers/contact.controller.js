const Contact = require("../models/contact.model.js");

// Create and Save a new contact
exports.create = (req, res) => {
  
};

// Retrieve all contacts from the database (with condition).
exports.findAll = (req, res) => {
  
};

// Find a single contact with a id
exports.findOne = (req, res) => {
  
};

// find all published contacts
exports.findAllPublished = (req, res) => {
  
};

// Update a contact identified by the id in the request
exports.update = (req, res) => {
  
};

// Delete a contact with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all contacts from the database.
exports.deleteAll = (req, res) => {
  
};



exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a contact
    const contact = new Contact({
      title: req.body.title,
      description: req.body.description,
      published: req.body.published || false
    });
  
    // Save contact in the database
    Contact.create(contact, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the contact."
        });
      else res.send(data);
    });
  };

// Retrieve all contacts from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;
  
    Contact.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving contacts."
        });
      else res.send(data);
    });
  };
  
  exports.findAllPublished = (req, res) => {
    Contact.getAllPublished((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving contacts."
        });
      else res.send(data);
    });
  };


  exports.findOne = (req, res) => {
    Contact.findById(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found contact with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving contact with id " + req.params.id
          });
        }
      } else res.send(data);
    });
  };

  exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    console.log(req.body);
  
    Contact.updateById(
      req.params.id,
      new Contact(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found contact with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating contact with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };



  exports.delete = (req, res) => {
    Contact.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found contact with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete contact with id " + req.params.id
          });
        }
      } else res.send({ message: `contact was deleted successfully!` });
    });
  };


  exports.deleteAll = (req, res) => {
    Contact.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all contacts."
        });
      else res.send({ message: `All contacts were deleted successfully!` });
    });
  };
  