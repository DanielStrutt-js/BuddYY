var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var barsModel = require('../models/bar');
var eventModel = require('../models/event')


 
  /* POST newProfile page. */
  router.put('/newProfile', async function(req, res, next) {
    //updateOne
          var user = await userModel.updateOne(

            {id:req.body._id},

            {img: req.body.img,
              job: req.body.job,
              hobby: req.body.hobby,
              bands: req.body.bands,
              drinks: req.body.drinks}
          
          )
          
              // user.save(function(error, user) {
              // console.log("USER SAVED ---->", user)
              // res.json({result: true});
      // });

     
    } );


/* GET profile page. */
router.get('/', function(req, res, next) {
  //findOne
  userModel.findOne({_id : req.query.userId}, 
    function(err, user) {
  
    if(user) {
  
      res.json({result: true});
  
    } else {
  
      console.log('Aucun user dans ma BD --->')
      res.json({result:false});
  
    }
  })
  });
  
  /* POST profile page. */
  router.put('/update', async function(req, res, next) {
  //updateOne
        var user = await userModel.updateOne({
          image: req.body.img,
          job: req.body.job,
          hobby: req.body.hobby,
          bands: req.body.bands,
          drinks: req.body.drinks
        })
        
            user.save(function(error, user) {
            console.log("USER SAVED ---->", user)
            res.json({result: true, user});
    });
  } );

module.exports = router;
