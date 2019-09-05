const { Schema, model } = require('mongoose');

const Tweet = new Schema({
    usuario: { type: String, required: true },
    tweet: { type: String, required: true }
});

module.exports = model('Tweet', Tweet);