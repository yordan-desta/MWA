const gamesOfJson = require('../games.json');

module.exports.getAllGames = function(req, res) {

    let count = 10;
    let offset = 10;

    if (req.query && req.query.count) {
        count = parseInt(req.query.count);
    }
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }

    const result = gamesOfJson.splice(offset, count + offset);

    res.status(200).json(result);
}