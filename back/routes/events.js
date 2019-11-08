var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var barsModel = require('../models/bar');
var eventModel = require('../models/event');
var request = require('async-request');

var config = {
  headers: {
    Authorization: 'Bearer 15qOueuXsnhr0wsgcD8QleaUarAvHcmTW_vouxf6mlJAI7XZn1UlIoR4YOd3sTkqeTMpOXMP2zJ9Z2D_fLMFO4vLjKA1qbq9rkh9g5IJzPNGSX42oNew1YFAHPPCXXYx',
  }}


  /* POST createEvents page. */

  router.post('/create', function(req, res, next) {
    //newEventModel
    console.log(req.body)
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

  // Get movies
router.get('/yelpList',async function(req,res,next){

  // We use async await request to access movies data from the API
  var data = await request(`https://api.yelp.com/v3/businesses/search?latitude=48.860893&longitude=2.349372&radius=40000 &categories=bars&limit=50&offset=150`, config)

    // We need to parse the body to be able to access the data with the format json
    body = JSON.parse(data.body);
   
    
   
    

     // 1) We create à newMovie with our movieModel
  var barYelp = body.businesses.forEach(function(businesses) {
   
    newBar = new barsModel({
                                 cityName : businesses.location.city,
                                 barImg : businesses.image_url,
                                 barName: businesses.name,
                                 barAdress: businesses.address1,
                                 longitude: businesses.coordinates.longitude,
                                 latitude: businesses.coordinates.latitude,
                                 rating:businesses.rating,
                                 })
   console.log(newBar)
      newBar.save(
          function (error,bar) {
            if(error){
              console.log("Oups...error ->", error)
            }else{
              console.log('list of bars ---->', bar)
              
            }
          }
      )
    
  })
  res.json({result: true});

})



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
