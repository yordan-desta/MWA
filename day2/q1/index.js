const express = require('express');
require('dotenv').config();

const app = express();

const server = app.listen(process.env.PORT, function() {
    console.log(`listening on ${server.address().port}`);
});