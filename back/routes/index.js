var express = require('express');
var router = express.Router();
var userModel = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

/* POST signUp page. */
router.post('/signUp', function(req, res, next) {

  const user = await userModel.findOne({
    email:req.body.email,
  })
  if(user){   
    console.log('We found a User with this email')
    res.json({user});    
  }else{
    const newUser = new userModel({
      lastName: req.body.lastName,
      firstname: req.body.first_name,
      email: req.body.email,
      password: req.body.password
    });

    newUser.save(function(error, user) {
      console.log("USER SAVED ---->", user)
      res.json({user});
    });
  } 
    console.log('There is no user with this email ! So we add a user')  
  } );


/* GET signIn page. */
router.get('/signIn', function(req, res, next) {

  const user = await userModel.findOne({
    email:req.body.email,
    password: req.body.password
  })
  if(user){   
    console.log('We found a User with this email')
    res.json({user});    
  }else{
    console.log('There is no user with this email ! So we add a user')  
  } 
});


/* POST newProfile page. */
router.post('/newProfile', function(req, res, next) {
  
  const newUser = new userModel({
    image: req.query.img,
    job: req.query.job,
    hobby: req.query.hobby,
    bands: req.query.bands,
    drinks: req.query.drinks
  });

  newUser.save(function(error, user) {
    console.log("USER SAVED ---->", user)
    res.json({user});
  });

});

/* GET profile page. */
router.get('/profile', function(req, res, next) {

  var newProfile= new userModel({
    image: req.body.img,
    job: req.body.job,
    hobby: req.body.hobby,
    bands: req.body.bands,
    drinks: req.body.drinks
  });
  res.render('profile');
});

/* POST profile page. */
router.post('/profile', function(req, res, next) {

  res.render('profile');
});

/* GET bar page. */
router.get('/barprox', function(req, res, next) {

  res.render('barprox');
});

/* GET events page. */
router.get('/events', function(req, res, next) {

  res.render('events');
});

/* POST createEvents page. */
router.post('/createEvents', function(req, res, next) {

  res.render('events');
});

/* GET eventsDetails page. */
router.get('/eventsDetails', function(req, res, next) {

  res.render('events');
});

/* POST chat page. */
router.post('/chat', function(req, res, next) {

  res.render('chat');
});


module.exports = router;
