const express = require('express');
const gamesController = require('../controller/games.controller');

const router = express.Router();

router.route('/games').get(gamesController.getAllGames);

router.route('/games/:gameId').get(gamesController.getGameById);

module.exports = router;