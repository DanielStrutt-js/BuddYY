var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var barsModel = require('../models/bar');
var eventModel = require('../models/event')


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
  

/* GET events page. */

router.get('/', async function(req, res, next) {
  //find 
  console.log("ici")
      var event = await eventModel.findById(
        {_id:req.query.id},
        function (err, event) {
          console.log(event);
          res.json(event)
      })
    });



router.get('/barList', async function(req, res, next){

  console.log("barEvents route")
  var bars = await barsModel.find(
   function(err, bars){
     console.log(bars);
     res.json(bars)
   })
});

router.get('/eventList', async function(req, res, next){

  console.log("eventEvents route")
  var eventList = await eventModel.find()
  .populate('bars').populate('eventCreator')
  .exec(function(err, events){
    console.log(events);
    res.json(events)
  })
   
});


  
/* PUT join an event*/

router.put('/join-event', async function(req,res,next){
console.log(req.query._id)
console.log(req.body.eventParticipants)
  var event = await eventModel.update(
    {_id:req.query.id},
    
    {$push:{
      //chat: req.body.chat
      eventParticipants: req.body.eventParticipants,
    }})
  
    if(event){

      console.log("Event Joined", event)
      res.json({result:true, event})

    }else{

      console.log("Erreur--->", event)
      res.json({result:false, message:'essayer de nouveau'});
    }
    

})




module.exports = router;
