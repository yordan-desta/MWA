angular.module('nobelPrizeApp').controller('NobelListController', nobelController);

function nobelListController(NobelDataFactory) {
    const vm = this;
    vm.title = "in contr";

    NobelDataFactory.getAll().then(function(response) {
        console.log(response.data);
    });

}