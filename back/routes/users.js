var express = require('express');
var router = express.Router();
var userModel = require('../models/user');
var barsModel = require('../models/bar');
var eventModel = require('../models/event')



/* POST signUp page. */
router.post('/signUp', async function(req, res, next) {
  console.log('===> req', req.body)
  userModel.findOne({
    email : req.body.email,
  },function (err, user){
    console.log(user)
  if(user){   
    console.log('We found a User with this email')
    res.json({result: false, message:'Cet utilisateur existe déjà'});    
  }else{

    // faire des var
   var NewUser = new userModel({
      lastname: req.body.lastname,
      firstname: req.body.firstname,
      email: req.body.email,
      password: req.body.password,
    });

    NewUser.save(function(error, user) {
      console.log("USER SAVED ---->", user)
      res.json({result: true, user});
    });
  } 
  } )
    console.log('There is no user with this email ! So we add a user')  

} );



  /* POST newProfile page. */
  router.put('/newProfile', async function(req, res, next) {
    //updateOne
    console.log(req.query)
    console.log(req.body)
          var user = await userModel.updateOne(
            {_id:req.query.id},
         
              {img: req.body.img,
              userName: req.body.userName,
              job: req.body.job,
              hobby: req.body.hobby,
              bands: req.body.bands,
              drinks: req.body.drinks}
          
          )

          var user = await userModel.findOne({
            _id:req.query.id,
          });
          
              // user.save(function(error, user) {
              // console.log("USER SAVED ---->", user)
              // res.json({result: true});
      // });

      console.log(user)

     res.json({result:true, user})
    } );


/* GET signIn page. *////
router.get('/signIn', async function(req, res, next) {

  var user = await userModel.findOne({
    email:req.query.email,
    password: req.query.password
  })
  if(user){   
    console.log('We found a User with this email')
    res.json({result: true, user});    
  }else{
    console.log('There is no user with this email ! So we add a user')  
    res.json({result: false})
  } 
});


// /* POST newProfile page. */
// router.post('/newProfile', async function(req, res, next) {
  
//   const newProfile = await userModel.updateOne({
//     image: req.body.img,
//     job: req.body.job,
//     hobby: req.body.hobby,
//     bands: req.body.bands,
//     drinks: req.body.drinks
//   });

//   newProfile.save(function(error, profile) {
//     console.log("PROFILE SAVED ---->", profile)
//     res.json({profile});
//   });

// });

module.exports = router;
