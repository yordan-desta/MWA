require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();

require('./api/data/db');
const router = require('./api/router');

app.use(function(req, res, next) {
    console.log(req.url, req.method);
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api', router);


const server = app.listen(process.env.PORT, function() {
    console.log(`listening reqests on ${server.address().port}`);
});