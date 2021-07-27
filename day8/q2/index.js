require('dotenv').config();

require('./api/data/db');

const router = require('./api/router');
const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));
app.use('/node_modules', express.static('node_modules'));

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

app.use('/api', router);

const server = app.listen(process.env.PORT, function() {
    console.log(`listening on ${server.address().port}`);
})