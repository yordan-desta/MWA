angular.module('nobelPrizeApp').factory('NobelDataFactory', nobelFactory);

function nobelFactory($http) {
    return {
        getAll: getAll,
        getOne: getOne,
        addNobel: addNobel,
        deleteNobel: deleteNobel,
        updateNobel: updateNobel
    }

    function getAll() {
        return $http.get('/api/nobelprizes').then(completed).catch(thrown);
    }

    function getOne(nobelId) {
        return $http.get('/api/nobelprizes/' + nobelId).then(completed).catch(thrown);
    }

    function completed(response) {
        console.log(response);
        return response;
    }

    function thrown(error) {
        console.log(error);
        return error;
    }

    function addNobel(nobel) {
        return $http.post('/api/nobelprizes/', nobel).then(completed).catch(thrown);
    }

    function deleteNobel(id) {
        console.log('deleting', id);
        return $http.delete('/api/nobelprizes/' + id).then(completed).catch(thrown);
    }

    function updateNobel(id, nobel) {
        console.log('undating', id);
        return $http.put('/api/nobelprizes/' + id, nobel).then(completed).catch(thrown);
    }
}