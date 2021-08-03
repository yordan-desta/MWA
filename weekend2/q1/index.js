require('dotenv').config();
const path = require('path');
const express = require('express');

const app = express();
require('./api/data/db');
const router = require('./api/router');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static('node_modules'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});

app.use("/api", router);

const server = app.listen(process.env.PORT, function() {
    console.log(`listening on port ${server.address().port}`)
});