var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var barsModel = require('../models/bar');
var eventModel = require('../models/event')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json('index');
});






/* GET bar page. */
router.get('/barprox',async function(req, res, next) {
    //find
    var barsFind = await barsModel.find();
    res.json(barsFind)
});



/* POST chat page. */
router.post('/chat', function(req, res, next) {

  res.render('chat');
});


module.exports = router;
