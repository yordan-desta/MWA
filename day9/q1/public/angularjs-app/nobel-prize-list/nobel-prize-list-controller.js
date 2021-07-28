angular.module('nobelPrizeApp').controller('NobelPrizeListController', nobelPrize);

function nobelPrize(NobelFactory) {
    const vm = this;
    vm.pageTitle = "Nobel Prizez Winners";

    NobelFactory.getAll().then(function(response) {
        console.log(response);
        vm.prizes = response.data;
    });
}