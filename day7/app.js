angular.module('CoinCapApp', ['ngRoute']).config(config);

function config($routeProvider) {
    $routeProvider.when('/:coinName', {
        templateUrl: "coincap/coincap.html",
        controller: "CoicapController",
        controllerAs: "coincapCtrl"
    }).when('/', {
        templateUrl: 'main/main.html',
        controller: 'MainController',
        controllerAs: 'mainCtrl'
    }).otherwise({
        redirectTo: '/'
    });
};