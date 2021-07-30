angular.module('jobApp').controller('JobsListController', JobsListController)

function JobsListController(JobDataFactory, $route) {

    const vm = this;

    vm.title = "joblist";

    vm.formdata = {};
    vm.formdata.skills = "";

    JobDataFactory.getAll().then(function(response) {
        console.log(response.data);
        vm.jobs = response.data;
    });

    vm.create = function() {
        let skills = vm.formdata.skills.split(',');
        vm.formdata.skills = skills;

        console.log('creating', vm.formdata);

        JobDataFactory.create(vm.formdata).then(function(response) {
            $route.reload();

        });
    }

    vm.deleteJob = function(id) {
        console.log('deleting', id);
        JobDataFactory.deleteJob(id).then(function(response) {
            $route.reload();
        });
    }
}