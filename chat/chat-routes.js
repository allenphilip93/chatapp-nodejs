var express = require('express');
var router = express.Router();

/*  "/chats"
 *    GET: finds all chats
 *    POST: creates a new chat
 */

router.get("/", function(req, res) {

});

router.post("/", function(req, res) {

});

/*  "/chats/:id"
 *    GET: find chat by id
 *    PUT: update chat by id
 *    DELETE: deletes chat by id
 */

router.get("/:id", function(req, res) {
});

router.put("/:id", function(req, res) {
});

router.delete("/:id", function(req, res) {
});

module.exports = router;