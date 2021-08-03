angular.module('nobelPrizeApp', ['ngRoute', 'angular-jwt']).config(config).run(run);

function config($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'angularjs-app/nobel-list/nobel-list.html',
        controller: 'NobelListController',
        controllerAs: 'vm',
        access: { restricted: false }
    }).when('/nobels/:id', {
        templateUrl: 'angularjs-app/nobel/nobel.html',
        controller: 'NobelController',
        controllerAs: 'vm',
        access: { restricted: false }
    }).when('/nobels/:id/edit', {
        templateUrl: 'angularjs-app/nobel/nobel-edit.html',
        controller: 'NobelEditController',
        controllerAs: 'vm',
        access: { restricted: true }
    }).when('/register', {
        templateUrl: 'angularjs-app/register/register.html',
        controller: 'RegisterController',
        controllerAs: 'vm',
        access: { restricted: false }
    }).when('/profile', {
        templateUrl: 'angularjs-app/profile/profile.html',
        controller: 'ProfileController',
        controllerAs: 'vm',
        access: { restricted: true }
    }).otherwise({
        redirectTo: '/'
    });;
}

function run($rootScope, $location, AuthFactory, $window) {
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        if (nextRoute.access && nextRoute.access.restricted && !AuthFactory.authenticated && !$window.sessionStorage.token) {
            event.preventDefault();
            $location.path('/');
        }
    });
}