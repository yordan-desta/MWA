angular.module('jobApp').controller('JobEditController', JobEditController)

function JobEditController(JobDataFactory, $location, $routeParams) {

    const vm = this;

    vm.title = "Job Detail";

    vm.formdata = {};
    vm.formdata.skills = "";

    JobDataFactory.getOne($routeParams.id).then(function(response) {
        console.log(response.data);

        vm.formdata = response.data;

        vm.formdata.skills = vm.formdata.skills.join(',');

        vm.formdata.lat = response.data.location.coordinates[1];
        vm.formdata.lng = response.data.location.coordinates[0];

        vm.formdata.postDate = new Date(response.data.postDate);

    });


    vm.update = function(id) {
        let skills = vm.formdata.skills.split(',');
        vm.formdata.skills = skills;

        console.log('updating', vm.formdata);

        JobDataFactory.updateJob(id, vm.formdata).then(function(response) {
            $location.path('/');
        });

    }
}