angular.module('jobApp').factory('JobDataFactory', JobDataFactory);

function JobDataFactory($http) {
    return {
        getAll: getAll,
        getOne: getOne,
        create: create,
        updateJob: updateJob,
        deleteJob: deleteJob
    }

    function complete(response) {
        console.log(response);
        return response;
    }

    function failure(error) {
        console.log(error);
        return error;
    }

    function getAll() {
        return $http.get('/api/jobs').then(complete).catch(failure);
    }

    function getOne(id) {
        return $http.get('/api/jobs/' + id).then(complete).catch(failure);
    }

    function deleteJob(id) {
        return $http.delete('/api/jobs/' + id).then(complete).catch(failure);
    }

    function create(job) {
        return $http.post('/api/jobs', job).then(complete).catch(failure);
    }

    function updateJob(id, job) {
        return $http.put('/api/jobs/' + id, job).then(complete).catch(failure);
    }
}