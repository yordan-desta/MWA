const express = require('express');
const nobelPrizeController = require('../controller/nobelprize.controller');
const winnerController = require('../controller/winner.controller');
const router = express.Router();


router.route('/nobelprize')
    .get(nobelPrizeController.getAll)
    .post(nobelPrizeController.create);

router.route('/nobelprize/:nobelId')
    .get(nobelPrizeController.getOne)
    .put(nobelPrizeController.fullUpdate)
    .patch(nobelPrizeController.patchUpdate)
    .delete(nobelPrizeController.delete);

router.route('/nobelprize/:nobelId/winner')
    .get(winnerController.getAll)
    .post(winnerController.create);

router.route('/nobelprize/:nobelId/winner/:winnerId')
    .get(winnerController.getOne)
    .put(winnerController.fullUpdate)
    .patch(winnerController.patchUpdate)
    .delete(winnerController.delete);

module.exports = router;