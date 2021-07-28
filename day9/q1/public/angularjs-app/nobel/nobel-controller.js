angular.module('nobelPrizeApp').controller('NobelController', nobelController);

function nobelController(NobelDataFactory, $routeParams) {
    const vm = this;
    vm.title = "Nobel Detail";

    NobelDataFactory.getOne($routeParams.id).then(function(response) {

        vm.nobel = response.data;
    });

}