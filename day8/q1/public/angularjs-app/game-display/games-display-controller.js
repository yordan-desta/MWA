angular.module('meanGames').controller('GamesDisplayController', gamesDisplay);

function gamesDisplay(GameFactory, $routeParams) {
    const vm = this;

    GameFactory.getOne($routeParams.id).then(function(response) {
        console.log(response.data);

        vm.game = response.data;
        vm.rate = new Array(response.data.rate);
    });

}