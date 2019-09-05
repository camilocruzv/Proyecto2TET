const userCtrl = {};

const User = require('../models/User');

userCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users)
};

userCtrl.createUser = async (req, res) => {
    const { usuario, password } = req.body;
    const newUser = new User({usuario, password});
    await newUser.save();
    res.json({message: 'User Saved'});
};

module.exports = userCtrl;