angular.module('CoinCapApp').factory('DataFactory', dataFactory);

function dataFactory($http) {
    function getAll() {
        return $http.get('https://api.coincap.io/v2/assets')
            .then(completed)
            .catch(failed);
    };

    function getOne(coinName) {
        return $http.get('https://api.coincap.io/v2/assets/' + coinName)
            .then(completed)
            .catch(failed);
    };

    function completed(response) {
        return response.data;
    }

    function failed(error) {
        return error.statusText;
    };

    return {
        getAllCoin: getAll,
        getOneCoin: getOne
    }

}