angular.module('meanGames').controller('GamesListController', gamesListController);

function gamesListController(GameFactory) {
    const vm = this;
    vm.pageTitle = "Mean Games List";

    GameFactory.getAll().then(function(response) {
        console.log(response);
        vm.games = response.data;
    });
}