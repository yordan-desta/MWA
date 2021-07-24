const mongoose = require('mongoose');
require('./nobelprize.data');


mongoose.connect(process.env.CONN_URL + process.env.DB_NAME);

mongoose.connection.on('connected', function() {
    console.log("connection to db successful");
});

mongoose.connection.on('disconnected', function() {
    console.log("disconnected to db successfuly");
});

mongoose.connection.on('error', function() {
    console.log("error connecting to db");
});

process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('conn to db closed');
        process.exit(0);
    });
});

process.on('SIGTERM', function() {
    mongoose.connection.close(function() {
        console.log('conn to db closed');
        process.exit(0);
    });
});

process.once('SIGUSR2', function() {
    mongoose.connection.close(function() {
        console.log('conn to db closed');
        process.kig(process.pid, 'SIGUSR2');
    });
})