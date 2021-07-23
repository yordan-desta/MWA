const express = require('express');
require('dotenv').config();
require('./api/data/db');

const router = require('./api/router');

const app = express();

app.use('/api', router);


const server = app.listen(process.env.PORT, function() {
    console.info(`listening the ${server.address().port}`)
})