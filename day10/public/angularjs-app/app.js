angular.module('jobApp', ['ngRoute']).config(config);

function config($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'angularjs-app/jobs-list/jobs-list.html',
        controller: 'JobsListController',
        controllerAs: 'vm'
    }).when('/jobs/:id', {
        templateUrl: 'angularjs-app/job/job.html',
        controller: 'JobController',
        controllerAs: 'vm'
    }).when('/jobs/:id/edit', {
        templateUrl: 'angularjs-app/job-edit/job-edit.html',
        controller: 'JobEditController',
        controllerAs: 'vm'
    }).otherwise({
        redirectTo: '/'
    })
}