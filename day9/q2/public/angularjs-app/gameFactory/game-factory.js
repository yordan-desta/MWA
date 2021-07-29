angular.module('meanGames').factory('GameFactory', gameFactory);

function gameFactory($http) {

    return {
        getOne: getOne,
        getAll: getAll,
        createGame: createGame,
        deleteGame: deleteGame,
        updateGame: updateGame
    }

    function getOne(id) {
        return $http.get('/api/games/' + id).then(completed).catch(failure);
    }

    function getAll() {
        return $http.get('/api/games/').then(completed).catch(failure);
    }

    function createGame(game) {
        return $http.post('/api/games/', game).then(completed).catch(failure);
    }

    function deleteGame(id) {
        return $http.delete('/api/games/' + id).then(completed).catch(failure);
    }

    function updateGame(id, game) {
        return $http.put('/api/games/' + id, game).then(completed).catch(failure);
    }

    function completed(response) { return response; }

    function failure(error) { return error; }

}