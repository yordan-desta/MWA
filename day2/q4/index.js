const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.get('/:input', function(req, res) {
    console.log(`input from query is ${req.query?.input} and input from param is ${req.params?.input}`);

    let fromInput = (req.query && req.query.input) ? parseInt(req.query.input) : 0;
    let fromParam = (req.params && req.params.input) ? parseInt(req.params.input) : 0;

    const sum = fromInput + fromParam;
    res.status(200).send('' + sum);
});

const server = app.listen(process.env.PORT, function() {
    console.log(`listening on ${server.address().port}`);
});