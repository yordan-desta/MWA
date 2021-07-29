angular.module('nobelPrizeApp').controller('NobelListController', nobelListController);

function nobelListController(NobelDataFactory, $route) {
    const vm = this;
    vm.title = "in contr";

    NobelDataFactory.getAll().then(function(response) {
        console.log(response.data);
        vm.nobels = response.data;
    });

    vm.category = ['CHEMISTRY', 'PHYSICS'];

    vm.nobelForm = "addForm";

    vm.formdata = {};

    vm.create = function() {
        NobelDataFactory.addNobel(vm.formdata).then(function(response) {
            $route.reload();
        });
    }

    vm.delete = function(id) {
        NobelDataFactory.deleteNobel(id).then(function(response) {
            $route.reload();
        });
    }

}