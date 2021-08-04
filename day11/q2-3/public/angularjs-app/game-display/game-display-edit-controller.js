angular.module('meanGames').controller('GamesDisplayEditController', gamesDisplay);

function gamesDisplay(GameFactory, $routeParams, $route) {
    const vm = this;
    vm.gameData = {};

    GameFactory.getOne($routeParams.id).then(setToModel);

    function setToModel(response) {
        vm.gameData = response.data;
    }

    vm.edit = function() {
        console.log(vm.gameData)
        GameFactory.updateGame($routeParams.id, vm.gameData).then(() => $route.reload());
    }
}