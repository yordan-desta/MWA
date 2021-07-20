const express = require('express');
const path = require('path');
const routers = require('./api/router')
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use('/api', routers);

const server = app.listen(process.env.PORT, function() {
    console.log(`listening on ${server.address().port}`);
});