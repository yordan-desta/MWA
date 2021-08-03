angular.module('nobelPrizeApp').directive('nobelFooter', nobelFooter);

function nobelFooter() {
    return {
        restrict: 'E',
        templateUrl: 'angularjs-app/directive/footer/footer.html'
    }
}