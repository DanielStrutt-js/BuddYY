const mongoose = require('mongoose');


const eventSchema = mongoose.Schema({
    eventTime: String,
    eventDay: Date,
    eventDescription: String,
    chat: { type: mongoose.Schema.Types.ObjectId, ref: 'chat' },
    eventCreator: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    eventParticipants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    bars: { type: mongoose.Schema.Types.ObjectId, ref: 'bars' }

});

const eventModel = mongoose.model('events', eventSchema);

module.exports = eventModel;