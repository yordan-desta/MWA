angular.module('nobelPrizeApp', ['ngRoute']).config(config);

function config($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'angularjs-app/nobel-list/nobel-list.html',
        controller: 'NobelListController',
        controllerAs: 'vm'
    }).when('/nobels/:id', {
        templateUrl: 'angularjs-app/nobel/nobel.html',
        controller: 'NobelController',
        controllerAs: 'vm'
    });
}