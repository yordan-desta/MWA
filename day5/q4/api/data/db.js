const mongoose = require('mongoose');

require('./student.data');

mongoose.connect(process.env.CONN_URL + process.env.DB_NAME);

mongoose.connection.on('connected', function() { console.log("connected with the database") });

mongoose.connection.on('disconnected', function() { console.log("disconnected with the database") });

mongoose.connection.on('error', function() { console.log("error occured with the database") });

process.on("SIGINT", function() {
    mongoose.connection.close(function() {
        console.log('db conn closed');
        process.exit(0);
    });
});

process.on('SIGTERM', function() {
    mongoose.connection.close(function() {
        console.log('db connection closed');
        process.exit(0);
    });
});

process.once('SIGUSR2', function() {
    mongoose.connection.close(function() {
        console.log('db conn closed');
        process.kill(process.pid, 'SIGUSR2');
    });

});