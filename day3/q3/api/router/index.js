const express = require('express');
const gamesController = require('../controller/game.controller');

const router = express.Router();

router.route('/games')
    .get(gamesController.getAllGames);

module.exports = router;