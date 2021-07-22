const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

const _dbUrl = process.env.CONNECTION + process.env.DB_NAME;

let _meanGameDatabse = null;

function open() {
    MongoClient.connect(_dbUrl, function(err, client) {
        if (err) {
            console.log("unable to connect to " + _dbUrl);
            return;
        }
        _meanGameDatabse = client.db(process.env.DB_NAME);

        console.log(`connection successful to ${_dbUrl}`);
    });
}

const get = function() {
    return _meanGameDatabse;
}

module.exports = {
    get: get,
    open: open
}