const mongoose = require('mongoose');

var options = {
   connectTimeoutMS: 5000,
   useNewUrlParser: true,
   useUnifiedTopology: true
  };

mongoose.connect('mongodb+srv://Daniel:mongoBuddyy.2019@cluster0-uddhx.mongodb.net/buddyy?retryWrites=true&w=majority',
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