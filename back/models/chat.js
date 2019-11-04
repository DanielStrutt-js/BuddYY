const mongoose = require('mongoose');


const chatSchema = mongoose.Schema({

    chatId: String

});

const chatModel = mongoose.model('events', chatSchema);

module.exports = chatModel;