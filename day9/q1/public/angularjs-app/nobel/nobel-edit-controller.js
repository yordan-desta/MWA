angular.module('nobelPrizeApp').controller('NobelEditController', editController);

function editController($routeParams, NobelDataFactory) {
    const vm = this;

    vm.title = "Edit Nobel Detail";
    vm.category = ['CHEMISTRY', 'PHYSICS'];
    NobelDataFactory.getOne($routeParams.id).then(function(response) {

        vm.nobel = response.data;
    });

    vm.update = function() {
        NobelDataFactory.updateNobel(vm.nobel._id, vm.nobel);
    }

}