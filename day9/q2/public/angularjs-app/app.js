angular.module('meanGames', ['ngRoute']).config(config);

function config($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'angularjs-app/games/games-list.html',
        controller: 'GamesListController',
        controllerAs: 'vm'
    }).when('/game/:id', {
        templateUrl: 'angularjs-app/game-display/game-display.html',
        controller: 'GamesDisplayController',
        controllerAs: 'vm'
    }).when('/game/:id/edit', {
        templateUrl: 'angularjs-app/game-display/game-display-edit.html',
        controller: 'GamesDisplayEditController',
        controllerAs: 'vm'
    });
}