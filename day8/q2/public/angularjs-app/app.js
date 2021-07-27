angular.module('nobelPrizeApp', ['ngRoute']).config(config);

function config($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'angularjs-app/nobel-prize-list/nobel-prize-list.html',
        controller: 'NobelPrizeListController',
        controllerAs: 'vm'
    }).when('/prize/:id', {
        templateUrl: 'angularjs-app/winner-list/winner-list.html',
        controller: 'WinnerController',
        controllerAs: 'vm'
    })
}