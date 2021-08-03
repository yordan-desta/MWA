angular.module('nobelPrizeApp').factory('AuthFactory', AuthFactory);

function AuthFactory() {
    let authenticated = false;

    return { authenticated: authenticated }
}