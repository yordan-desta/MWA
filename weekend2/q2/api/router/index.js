const express = require('express');
const nobelPrizeController = require('../controller/nobelprize.controller');
const winnerController = require('../controller/winner.controller');
const userController = require('../controller/users.controller');
const router = express.Router();


router.route('/nobelprizes')
    .get(nobelPrizeController.getAll)
    .post(nobelPrizeController.create);

router.route('/nobelprizes/:nobelId')
    .get(nobelPrizeController.getOne)
    .put(nobelPrizeController.fullUpdate)
    .patch(nobelPrizeController.patchUpdate)
    .delete(nobelPrizeController.delete);

router.route('/nobelprizes/:nobelId/winners')
    .get(winnerController.getAll)
    .post(winnerController.create);

router.route('/nobelprizes/:nobelId/winners/:winnerId')
    .get(winnerController.getOne)
    .put(winnerController.fullUpdate)
    .patch(winnerController.patchUpdate)
    .delete(winnerController.delete);

router.route('/users').post(userController.register);

router.route('/login').post(userController.login);

module.exports = router;