angular.module('nobelPrizeApp').controller('WinnerController', winnercontroller);

function winnercontroller(NobelFactory, $routeParams) {
    const vm = this;
    NobelFactory.getOne($routeParams.id).then(function(response) {
        console.log(response);
        vm.prize = response.data;
    });
}