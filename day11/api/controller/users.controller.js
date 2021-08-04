const mongoose = require('mongoose');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = mongoose.model('User');

module.exports.login = function(req, res) {
    const credential = {
        username: req.body.username
    }

    User.findOne(credential)
        .then((user) => validateUsername(user, res))
        .then((doc) => checkPass(doc, req))
        .then((same) => loginUser(same, res, credential))
        .catch((err) => res.status(500).json(err));
};

function validateUsername(doc, res) {

    if (!doc) {
        res.status(401).json({ "message": "wrong creds!" });
        return;
    }

    console.log('user found', doc.username, doc.password);

    return doc;
}

function checkPass(doc, req) {
    return bcrypt.compare(req.body.password, doc.password);
}

function loginUser(same, res, credential) {
    const response = {
        status: 200
    }
    if (same) {
        console.log('user authenticated');
        response.message = jwt.sign({ payload: credential.username }, process.env.PASS_PHRASE, { expiresIn: 3600 });
    } else {
        response.status = 401;
        response.message = { "message": "Wrong credentials" };
    }
    console.log('sending ', response.message);
    res.status(response.status).json(response.message);
}

module.exports.authenticate = function(req, res, next) {
    if (!req.headers.authorization) {
        res.status(400).json({ 'message': 'token missing' });
    } else {
        const token = req.headers.authorization.split(' ')[1];

        jwt.verify(token, process.env.PASS_PHRASE, function(err, decoded) {
            if (err) {
                res.status(401).json({ 'message': 'Unauthorized' });
            } else {
                next();
            }
        });

    }
};

module.exports.register = function(req, res) {
    bcrypt.genSalt(10)
        .then((generatedSalt) => hashPassword(generatedSalt, req))
        .then((hashPass) => registerUser(hashPass, req))
        .then((user) => res.status(201).json(user))
        .catch((err) => res.status(500).json(err));
}

function registerUser(hashedPassword, req) {

    const newUser = {};

    newUser.username = req.body.username;
    newUser.password = hashedPassword;
    newUser.name = req.body.name;

    return User.create(newUser);
}

function hashPassword(generatedSalt, req) {
    return bcrypt.hash(req.body.password, generatedSalt);
}