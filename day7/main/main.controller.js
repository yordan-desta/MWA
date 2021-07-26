angular.module('CoinCapApp').controller('MainController', mainController);

function mainController(DataFactory) {
    const vm = this;

    DataFactory.getAllCoin().then(function(response) {
        console.log(response.data);
        vm.coins = response.data;
    });
}