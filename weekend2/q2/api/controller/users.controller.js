const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports.register = function(req, res) {

    bcrypt.genSalt(10, function(err, salt) {
        console.log(salt, req.body.password);
        bcrypt.hash(req.body.password, salt, function(err, encryptedPassword) {
            if (err) {
                console.log(err);
                res.status(500).json({ 'message': 'unabled to hash password!' });
                return;
            }

            const user = {};

            user.username = req.body.username;
            user.name = req.body.name;
            user.password = encryptedPassword;

            User.create(user, function(err, doc) {
                const response = {
                    status: 201,
                    message: doc
                };

                if (err) {
                    status = 500;
                    message = err;
                }

                res.status(response.status).json(response.message);
            })
        })

    });
};

module.exports.login = function(req, res) {
    const credential = {
        username: req.body.username
    };

    User.findOne(credential, function(err, doc) {
        const response = {
            status: 200,
            message: doc
        };
        if (err) {
            response.status = 500;
            response.message = err;
        }
        if (!doc) {
            response.status = 400;
            response.message = { "message": "wrong creds!" }
        }
        if (response.status !== 200) {
            res.status(response.status).json(response.message);
            return;
        }

        bcrypt.compare(req.body.password, doc.password, function(err, same) {

            if (same) {
                const token = jwt.sign({ 'username': doc.username }, process.env.PASS_PHRASE, { expiresIn: 3600 });
                res.status(200).json({ "token": token });
                return;
            } else {
                res.status(401).json(err);
            }
        })
    })
};

module.exports.authenticate = function(req, res, next) {
    const aHeaders = req.headers.authorization;

    if (aHeaders) {
        jwt.verify(token, process.env.PASS_PHRASE, function(err, decoded) {
            if (err) {
                res.status(401).json({ 'message': 'Unauthorized' });
            } else {
                req.user = decoded.username;
                next();
            }
        });
    } else {
        res.status(403).json({ 'message': 'No token provided' })
    }
}