angular.module('meanGames').controller('GamesListController', gamesListController);

function gamesListController(GameFactory, $route) {
    const vm = this;
    vm.pageTitle = "Mean Games List";

    vm.gameForm = "gameForm";

    vm.gameData = {};

    GameFactory.getAll().then(function(response) {
        console.log(response);
        vm.games = response.data;
    });

    vm.create = function() {
        GameFactory.createGame(vm.gameData).then(function(response) {
            $route.reload();
        });
    }
}