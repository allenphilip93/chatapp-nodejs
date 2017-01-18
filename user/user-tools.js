var mongodb = require('mongodb');

function getAllRecords() {
  console.log('connecting to db');
  // Connect to the db
  return mongodb.MongoClient.connect("mongodb://localhost:27017/CRM_db", function (err, db) {
    if (err) {
      throw err;
    } else {
      return db.collection('contacts', function (err, collection) {
        collection.find().toArray(function (err, items) {
          if (err) throw err;
          return items;
        });
      });
    }
  });
};

module.exports = getAllRecords;