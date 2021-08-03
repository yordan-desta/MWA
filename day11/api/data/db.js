const mongoose = require('mongoose');
require('./games.data');
require('./users.model');

mongoose.connect(process.env.CONN_URL + process.env.DB_NAME, { useUnifiedTopology: true, useNewUrlParser: true });

mongoose.connection.on('connected', function() {
    console.log('connected to the database');
});

mongoose.connection.on('disconnected', function() {
    console.log('disconnected from the database');
});

mongoose.connection.on('error', function() {
    console.log('error connecting to the database');
});

process.on("SIGINT", function() {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected by app termination');
        process.exit(0);
    });
});

process.on("SIGTERM", function() {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected by app termination');
        process.exit(0);
    });
});

process.once("SIGUSR2", function() {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected by app termination');
        process.kill(process.pid, "SIGUSR2");
    });
});