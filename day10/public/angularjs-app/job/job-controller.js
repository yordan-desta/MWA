angular.module('jobApp').controller('JobController', JobController)

function JobController(JobDataFactory, $location, $routeParams) {

    const vm = this;

    vm.title = "Job Detail";


    JobDataFactory.getOne($routeParams.id).then(function(response) {
        console.log(response.data);
        vm.job = response.data;
    });
}