const mongoose = require('mongoose');
require('./games.data');

mongoose.connect(process.env.CONN_URL + process.env.DB_NAME);

mongoose.connection.on('connected', function() {
    console.log('connection established successfully');
});

mongoose.connection.on('error', function() {
    console.log('connection error to the database');
});

mongoose.connection.on('disconnected', function() {
    console.log('connection disconnected');
});

process.on("SIGINT", function() {
    mongoose.connection.close(function() {
        console.log('connection closed succesfully');
        process.exit(0);
    });
});

process.on("SIGUSR2", function() {
    mongoose.connection.close(function() {
        console.log('connection closed succesfully');
        process.exit(0);
    });
});