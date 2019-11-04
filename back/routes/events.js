var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var barsModel = require('../models/bar');
var eventModel = require('../models/event')


/* GET events page. */
router.get('/', async function(req, res, next) {
  //find
      eventModel.find((err, events)=>{
        if (err) {
          console.log("Erreur ---->", err)
          res.json({result : false, message : 'Aucun événements '});
        } else {
          console.log("EVENT SAVED ---->", events)
          res.json({result : true, events});
        }
      });
  });
  
  /* POST createEvents page. */
  router.post('/create', function(req, res, next) {
  //newEventModel
      var newEvent = new eventModel({
        eventTime: req.body.eventTime,
        eventDay: req.body.eventDay,
        eventDescription: req.body.eventDescription,
        bars: req.body.bars,
        eventCreator: req.body.eventCreator
      });
  
      newEvent.save(function(error, event) {
        if (error) {
          console.log("Erreur ---->", error)
          res.json({result : false});
        } else {
          console.log("EVENT SAVED ---->", event)
          res.json({result : true, event});
        }
       
  });
  });

module.exports = router;

