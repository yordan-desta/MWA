angular.module('nobelPrizeApp').factory('NobelFactory', nobelFactory);

function nobelFactory($http) {
    function getAll() {
        return $http.get('/api/nobelprizes').then(completed).catch(failure);
    }

    function getOne(id) {
        return $http.get('/api/nobelPrizes/' + id).then(completed).catch(failure);
    }

    function completed(response) {
        return response;
    }

    function failure(err) {
        return err;
    }
    return {
        getAll: getAll,
        getOne: getOne
    }
}