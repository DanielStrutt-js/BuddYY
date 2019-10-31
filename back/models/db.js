const mongoose = require('mongoose');

var options = {
   connectTimeoutMS: 5000,
   useNewUrlParser: true,
   useUnifiedTopology: true
  };

mongoose.connect('mongodb+srv://louis:azerty@openweatherapp-jgpj3.mongodb.net/Buddyy?retryWrites=true&w=majority',
    options,
    function(err) {
     if (err) {
       console.log(`error, failed to connect to the database because --> ${err}`);
     } else {
       console.info('*** Buddyy database coonection done ***');
     }
    }
);

module.exports = mongoose;