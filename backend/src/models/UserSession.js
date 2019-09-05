const { Schema, model } = require('mongoose');

const UserSession = new Schema({
    userId: {
        type: String,
        default: ''
    },
    timestamp: {
        type: Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

module.exports = model('UserSession', UserSession);