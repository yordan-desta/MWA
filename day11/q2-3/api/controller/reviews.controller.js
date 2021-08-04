const mongoose = require('mongoose');

const Game = mongoose.model('Game');


module.exports.getGameReviews = function(req, res) {

    console.log(`Getting a game reviews`);

    Game.findById(req.params.gameId).select('reviews')
        .exec()
        .then((doc) => returnReviews(doc, res))
        .catch((err) => res.status(500).json(err));;
};

function returnReviews(game, res) {
    if (!game) {
        res.status(404).json({ "message": "Your requested unavailable resource" });
    } else {
        res.status(200).json({ "message": game });
    }
}


module.exports.getOneReview = function(req, res) {
    console.log(`getting game review with id ${req.params.reviewId}`);

    Game.findById(req.params.gameId).select('reviews')
        .exec()
        .then((doc) => returnReview(doc, res))
        .catch((err) => res.status(500).json(err));;
}

function returnReview(game, res) {
    if (!game) {
        res.status(404).json({ "message": "Your requested unavailable resource" });
    } else {
        res.status(200).json({ "message": game.reviews.id(req.params.reviewId) });
    }
}

module.exports.createReview = function(req, res) {

    console.log("creating review");

    Game.findById(req.params.gameId).select('reviews')
        .exec()
        .then((doc) => saveReviewToGame(doc, req, res))
        .then((doc) => res.status(204).json(doc))
        .catch((err) => res.status(500).json(err));
};

function saveReviewToGame(game, req, res) {

    if (!game) {
        res.status(404).json({ "message": "Your requested unavailable resource" });
        return;
    }
    console.log("adding review");

    const review = {
        name: req.body.name,
        review: req.body.review,
        rating: req.body.rating
    }


    if (!game.reviews.length) {
        console.log('no reviews found')
        game.reviews = [review];

    } else {
        game.reviews.push(review);
    }


    console.log(game.reviews, review);

    return game.save();
}

module.exports.performFullUpdate = function(req, res) {
    console.log(`Performing full update on review`);

    Game.findById(req.params.gameId).select("reviews")
        .exec()
        .then((game) => updateReview(game, req, res))
        .then((doc) => res.status(204).json(doc))
        .catch((err) => res.status(500).json(err));
};

function updateReview(game, req, res) {

    if (!game) {
        res.status(404).json({ "message": "review not found" });
        return;
    }

    const reviewToUpdate = game.reviews.id(req.params.reviewId);

    if (!reviewToUpdate) {
        res.status(404).json({ "message": "review not found" });
        return;
    }

    reviewToUpdate.name = req.body.name;
    reviewToUpdate.review = req.body.review;
    reviewToUpdate.rating = req.body.rating;

    return game.save();
};

module.exports.performPatchUpdate = function(req, res) {
    console.log(`performing patch update for game ${req.params.gameId} review with id ${req.params.reviewId}`);

    Game.findById(req.params.gameId).select("reviews")
        .exec()
        .then((game) => patchUpdateGameReviews(game, req, res))
        .then((doc) => res.status(204).json(doc))
        .catch((err) => res.status(500).json(err));
};

function patchUpdateGameReviews(game, req, res) {
    if (!game) {
        res.status(404).json({ "message": "review not found" });
        return;
    }

    const reviewToUpdate = game.reviews.id(req.params.reviewId);

    if (!reviewToUpdate) {
        res.status(404).json({ "message": "review not found" });
        return;
    }

    if (req.body.name) { reviewToUpdate.name = req.body.name; }
    if (req.body.review) { reviewToUpdate.review = req.body.review; }
    if (req.body.rating) { reviewToUpdate.rating = req.body.rating; }

    return game.save();
};

module.exports.deleteReview = function(req, res) {
    console.log('deliting review from game');

    Game.findById(req.params.gameId).select("reviews")
        .exec()
        .then((game) => deleteReview(game, req, res))
        .then((doc) => res.status(204).json(doc))
        .catch((err) => res.status(500).json(err));
}

function deleteReview(game, req, res) {

    if (!game) {
        res.status(404).json({ "message": "review not found" });
        return;
    }

    const reviewToUpdate = game.reviews.id(req.params.reviewId);

    if (!reviewToUpdate) {
        res.status(404).json({ "message": "review not found" });
        return;
    }

    reviewToUpdate.remove();

    game.save();
}