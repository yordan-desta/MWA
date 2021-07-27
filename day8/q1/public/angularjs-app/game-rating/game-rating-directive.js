angular.module('meanGames').directive('gameRating', gameRating);

function gameRating() {
    return {
        restrict: 'E',
        templateUrl: '/angularjs-app/game-rating/game-rating.html',
        bindToController: true,
        controller: 'GamesDisplayController',
        controllerAs: 'vm'
    };
}