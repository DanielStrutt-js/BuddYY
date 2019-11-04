var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var barsModel = require('../models/bar');
var eventModel = require('../models/event')


 

/* GET profile page. */
router.get('/', function(req, res, next) {
  //findOne
  userModel.findOne({_id : req.query.id}, 
    function(err, user) {
  
    
      console.log('Je suis --->', user)
      res.json({result:true});
  
  
  })
  });
  
  /* PUT profile page. */
  router.put('/update', async function(req, res, next) {
  //updateOne
        /*var user = await */userModel.updateOne(
          {_id:req.query.id},
          {
          image: req.body.img,
          job: req.body.job,
          hobby: req.body.hobby,
          bands: req.body.bands,
          drinks: req.body.drinks
        },
        
            /*user.save*/(function(error, user) {
            console.log("USER SAVED ---->", user)
            res.json({result: true, user});
    })
  )
  } );

module.exports = router;
