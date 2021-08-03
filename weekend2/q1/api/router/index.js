const express = require('express');
const gamesController = require('../controller/games.controller');
const publisherController = require('../controller/publisher.controller');
const reviewsController = require('../controller/reviews.controller');
const usersController = require('../controller/users.controller');

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
    .patch(publisherController.performPatchUpdate);

router.route('/games/:gameId/reviews')
    .get(reviewsController.getGameReviews)
    .post(reviewsController.createReview);

router.route('/games/:gameId/reviews/:reviewId')
    .get(reviewsController.getOneReview)
    .delete(reviewsController.deleteReview)
    .put(reviewsController.performFullUpdate)
    .patch(reviewsController.performPatchUpdate);



router.route('/users')
    .post(usersController.register);

router.route('/login')
    .post(usersController.login);


module.exports = router;