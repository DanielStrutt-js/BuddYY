const mongoose = require('mongoose');


const barsSchema = mongoose.Schema({

    cityName: String,
    barImg: String,
    barName: String,
    barAdress: String,
    longitude: Number,
    latitude: Number,
   // description: String,
});

const barsModel = mongoose.model('bars', barsSchema);

module.exports = barsModel;