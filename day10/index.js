require('dotenv').config();
require('./api/data/db');

const router = require('./api/router');

const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(process.env.PUBLIC_FOLDER));
app.use('/node_modules', express.static(process.env.MODULES_FOLDER))

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.use('/api', router);

const server = app.listen(process.env.PORT, function() {
    console.log(`running on ${server.address().port}`);
})