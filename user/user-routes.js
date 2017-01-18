var express = require('express');
var mongodb = require('mongodb');
var router = express.Router();
// var userTools = require('./user-tools');

/*  "/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */

router.get("/", function(req, res) {
  mongodb.MongoClient.connect("mongodb://localhost:27017/CRM_db", function (err, db) {
    if (err) {
      throw err;
    } else {
      return db.collection('contacts', function (err, collection) {
        collection.find().toArray(function (err, items) {
          if (err) throw err;
          res.status(200).json(items);
        });
      });
    }
  });
});

router.post("/", function(req, res) {
});

/*  "/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

router.get("/:id", function(req, res) {
});

router.put("/:id", function(req, res) {
});

router.delete("/:id", function(req, res) {
});

module.exports = router;