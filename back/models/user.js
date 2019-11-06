const mongoose = require('mongoose');

// var hobbySchema = mongoose.Schema({
//     name: String,
// });
// var bandsSchema = mongoose.Schema({
//     name: String,
// });
// var drinksSchema = mongoose.Schema({
//     name: String,
// });
var userSchema = mongoose.Schema({
    userName: String,
    firstname: String,
    lastname: String,
    password: String,
    email: String,
    img: String,
    job: String,
    hobby: String,
    bands: String,
    drinks: String
});


module.exports = mongoose.model('users', userSchema);