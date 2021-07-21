const dbConnection = require('../data/dbconnection');

module.exports.getAllGames = function(req, res) {
    //get the file from db and return it

    const maxCount = 7;
    const defaultCount = 5;

    let count = defaultCount;

    if (req.query.count) {
        count = parseInt(req.query.count) > maxCount ? maxCount : parseInt(req.query.count);
    }

    let db = dbConnection.get();
    let gamesCollection = db.collection("games");

    gamesCollection.find().limit(count).toArray(function(err, docs) {
        res.status(200).json(docs);
    });
}