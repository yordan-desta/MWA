const express = require('express');
const gamesController = require('../controller/games.controller');

const router = express.Router();

router.route('/games')
    .get(gamesController.getAllGames)
    .post(gamesController.createOne);

router.route('/games/:gameId')
    .get(gamesController.getGameById)
    .put(gamesController.performFullUpdate)
    .patch(gamesController.performPatchUpdate)
    .delete(gamesController.deleteGame);

module.exports = router;