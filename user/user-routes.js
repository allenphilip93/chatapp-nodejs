var express = require('express');
var mongodb = require('mongodb');
var router = express.Router();

router.db = initializeDB();

function initializeDB() {
  return mongodb.MongoClient.connect("mongodb://localhost:27017/CRM_db", function (err, db) {
    if (err) throw err;
    else {
      console.log('Connection established to user db');
      module.exports.db = db;
      return db;
    }
  });
}

/*  "/contacts"
 *    GET: finds all contacts
 *    POST: creates a new contact
 */
router.get("/", function(req, res) {
  var params = req.query;
  var query_arr = [];
  for (var key in params) {
    var query = {};
    query[key] = new RegExp('^' + params[key]);
    query_arr.push(query);
  }
  var query = {};
  if (params) query["$and"] = query_arr;

  router.db.collection('contacts', function (err, collection) {
    collection.find(query).toArray(function (err, items) {
      if (err) throw err;
      res.status(200).json(items);
    });
  });
});

router.post("/", function(req, res) {
  var newUser = req.body;
  newUser.createDate = new Date();
  newUser.status = "Inactive";

  console.log(newUser);
  if (!(newUser.username || newUser.password || newUser.email || newUser._id)) {
    res.status(500).json("Validation Error");
  }
  router.db.collection('contacts').insertOne(newUser, function(err, doc) {
    if (err) throw err;
    else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

/*  "/contacts/:id"
 *    GET: find contact by id
 *    PUT: update contact by id
 *    DELETE: deletes contact by id
 */

router.get("/:id", function(req, res) {
  var query = {"_id" : req.params.id};
  router.db.collection('contacts', function (err, collection) {
    collection.findOne(query, function (err, items) {
      if (err) throw err;
      res.status(200).json(items);
    });
  });
});

router.put("/:id", function(req, res) {
  router.db.collection('contacts', function (err, collection) {
    if (!err) {
      var query = {'_id': req.params.id};
      collection.updateOne(query, req.body, function (err, doc) {
        if (err) throw err;
        else {
          res.status(204).json(doc);
        }
      });
    } else throw err;
  });
});

router.delete("/:id", function(req, res) {
  var query = {"_id" : req.params.id};
  router.db.collection('contacts', function (err, collection) {
    collection.deleteOne(query, function (err, doc) {
      if (err) throw err;
      res.status(204).json(doc);
    });
  });
});

module.exports = router;