const express = require('express');
const gamesController = require('../controller/games.controller');
const publisherController = require('../controller/publisher.controller');

const router = express.Router();

router.route('/games')
    .get(gamesController.getAllGames)
    .post(gamesController.createOne);

router.route('/games/:gameId')
    .get(gamesController.getGameById)
    .put(gamesController.performFullUpdate)
    .patch(gamesController.performPatchUpdate)
    .delete(gamesController.deleteGame);


router.route('/games/:gameId/publisher')
    .get(publisherController.getGamePublisher)
    .post(publisherController.createPublisher)
    .delete(publisherController.deletePublisher)
    .put(publisherController.performFullUpdate)
    .patch(publisherController.performPatchUpdate)

module.exports = router;