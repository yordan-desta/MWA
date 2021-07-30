angular.module('jobApp').filter('dateFilter', dateFilter);

function dateFilter() {
    return function(item) {
        const d = new Date();

        d.setMonth(d.getMonth() - 6);

        const postdate = new Date(item.postDate);

        console.log(d, postdate);

        if (postdate.getTime() >= d.getTime()) {
            return item.title;
        }
        return;
    }
}