angular.module('nobelPrizeApp').directive('nobelPrizeNavigation', nobelPrizeNavigation);

function nobelPrizeNavigation() {
    return {
        restrict: 'E',
        templateUrl: 'angularjs-app/directive/navigation/navigation.html'
    }
}