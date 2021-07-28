angular.module('nobelPrizeApp').factory('NobelDataFactory', nobelFactory);

function nobelFactory($http) {
    function getAll() {
        return $http.get('/api/nobelprizes').then(completed).catch(thrown);
    }

    function getOne(nobelId) {
        return $http.get('/api/nobelprizes/' + nobelId).then(completed).catch(thrown);
    }

    function completed(response) {
        return response;
    }

    function thrown(error) {
        console.log(error);
        return error;
    }

    return {
        getAll: getAll,
        getOne: getOne
    }
}