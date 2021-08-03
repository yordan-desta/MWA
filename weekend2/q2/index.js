require('dotenv').config();
const express = require('express');
require('./api/data/db');
const router = require('./api/router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
    console.log(req.url, req.method, req.body);
    next();
})

app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));

app.use('/api', router);

const server = app.listen(process.env.PORT, function() {
    console.log(`listening on port ${server.address().port}`);
})