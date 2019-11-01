const mongoose = require('mongoose');

var hobbySchema = mongoose.Schema({
    name: String,
});
var bandsSchema = mongoose.Schema({
    name: String,
});
var drinksSchema = mongoose.Schema({
    name: String,
});
var userSchema = mongoose.Schema({
    name: String,
    firstname: String,
    lastname: String,
    password: String,
    emailBuddy: String,
    img: String,
    job: String,
    hobby: [hobbySchema],
    bands: [bandsSchema],
    drinks: [drinksSchema]
});


module.exports = mongoose.model('users', userSchema);