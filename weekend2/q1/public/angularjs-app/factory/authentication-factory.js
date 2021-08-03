angular.module('meanGames').factory('AuthFactory', authFactory);

function authFactory() {
    let auth = false;

    return {
        authenticated: auth
    }
}