const express = require('express');
const path = require('path');
require('dotenv').config();
const router = require('./api/router');

const connection = require('./api/data/dbconnection');

connection.open();

const app = express();

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use('/api', router);

app.use(express.static(path.join(__dirname, 'public')));

const server = app.listen(process.env.PORT, function() {
    console.log(`listening on port ${server.address().port}`);
});