const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const User = new Schema({
    usuario: { type: String, required: true},
    password: { type: String, required: true }
});

User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = model('User', User);