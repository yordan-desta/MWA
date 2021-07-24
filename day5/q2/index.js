require('dotenv').config();
const express = require('express');

const app = express();
require('./api/data/db');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = require('./api/router');

app.use((req, res, next) => {
    console.log(req.url, req.method);
    next();
});

app.use("/api", router);

const server = app.listen(process.env.PORT, function() {
    console.log(`listening on port ${server.address().port}`)
});