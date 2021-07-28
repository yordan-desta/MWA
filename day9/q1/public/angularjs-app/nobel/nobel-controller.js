angular.module('nobelPrizeApp').controller('NobelController', nobelController);

function nobelController(NobelDataFactory, $routeParams) {
    const vm = this;
    vm.title = "in nobel controller";

    NobelDataFactory.getOne($routeParams.id).then(function(response) {
        console.log(response.data);
    });

}