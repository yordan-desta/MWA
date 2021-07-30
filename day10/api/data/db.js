const mongoose = require('mongoose');
require('./jobsearch.data');


mongoose.connect(process.env.CONN_URL + process.env.DB_NAME);

mongoose.connection.on('connected', function() {
    console.log('connected to db');
});
mongoose.connection.on('disconnected', function() {
    console.log('disconnnected from db');
});
mongoose.connection.on('error', function() {
    console.log('error connecting to db');
});

process.on('SIGINT', function() {
    mongoose.disconnect(function() {
        console.log('closed db');
        process.exit(0);
    })
});

process.on('SIGTERM', function() {
    mongoose.disconnect(function() {
        console.log('closed db');
        process.exit(0);
    })
});

process.once('SIGUSR2', function() {
    mongoose.disconnect(function() {
        console.log('closed db');
        process.kill(process.pid, 'SIGUSR2');
    });
});