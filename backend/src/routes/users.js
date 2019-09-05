const { Router } = require('express');
const router = Router();

const { getUsers, createUser } = require('../controllers/users')
const User = require('../models/User');
const UserSession = require('../models/UserSession');

router.route('/')
    .get(getUsers)
    .post(createUser);


router.post('/signup', (req, res, next) => {
    const { body } = req;
    const {
        usuario,
        password
    } = body;

    if (!usuario) {
        return res.send({
            success: false,
            message: 'Error: Digite el usuario'
        })
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Digite la contraseña'
        })
    }

    User.find({
        usuario: usuario
    }, (err, previousUsers) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error de servidor'
            })
        } else if (previousUsers.length > 0) {
            return res.send({
                success: false,
                message: 'Error: El usuario ya está elegido'
            })
        }

        const newUser = new User();

        newUser.usuario = usuario;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Digite el usuario'
                });
            }
            return res.send({
                success: true,
                message: 'Cuenta creada exitosamente'
            })
        });
    });
});

router.post('/signin', (req, res, next) => {
    const { body } = req;
    const {
        usuario,
        password
    } = body;

    if (!usuario) {
        return res.send({
            success: false,
            message: 'Error: Digite el usuario'
        })
    }
    if (!password) {
        return res.send({
            success: false,
            message: 'Error: Digite la contraseña'
        })
    }

    User.find({
        usuario: usuario
    }, (err, users) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error en el servidor'
            });
        } else if (users.length != 1) {
            return res.send({
                success: false,
                message: 'Error: el usuario o la contraseña son incorrectas'
            });
        }

        const user = users[0];
        if (!user.validPassword(password)) {
            return res.send({
                success: false,
                message: 'Error: el usuario o la contraseña son incorrectas'
            });
        }

        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error de servidor'
                })
            }

            return res.send({
                success: true,
                message: 'Sign In exitoso',
                token: doc._id
            });
        });
    });
});

router.post('/verify', (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error en el servidor'
            });
        }

        if (sessions.length != 1) {
            return res.send({
                success: false,
                message: 'Error: Inválido'
            });
        } else {
            return res.send({
                success: true,
                message: 'Éxito'
            });
        }
    });
});

router.get('/logout', (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    }, {
        $set: { isDeleted: true }
    }, null, (err, sessions) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error en el servidor'
            });
        }

        return res.send({
            success: true,
            message: 'Éxito'
        });

    });
});

module.exports = router;