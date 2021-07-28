angular.module('nobelPrizeApp').filter('winnerCount', winnerCount);

function winnerCount() {
    return function(winners) {
        if (!winners) {
            return 0;
        }
        return winners.length;
    }
}