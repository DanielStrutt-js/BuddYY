const mongoose = require('mongoose');


const userSchema = mongoose.Schema({

    name: String,
    firstname: String,
    lastname: String,
    password: String,
    email: String,
    img: String,
    job: String,
    hobby: Array,
    bands: Array,
    drinks: Array
});

const userModel = mongoose.model('users', userSchema);

module.exports = userModel;