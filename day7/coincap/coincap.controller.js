angular.module('CoinCapApp').controller('CoicapController', coincapController);

function coincapController(DataFactory, $routeParams) {
    const vm = this;

    DataFactory.getOneCoin($routeParams.coinName).then(function(response) {
        console.log(response.data);
        vm.coinInfo = response.data;
    });
};