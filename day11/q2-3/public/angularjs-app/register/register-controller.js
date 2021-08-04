angular.module('meanGames').controller('RegisterController', registerController);

function registerController(UserFactory) {
    const vm = this;

    vm.formdata = {};

    vm.register = function() {
        console.log(vm.formdata);
        if (vm.formdata.repeatpass !== vm.formdata.password) {
            console.log("passowrd not match");
            vm.err = "password must match";
        } else {
            vm.err = "";
            UserFactory.register(vm.formdata).then(success).catch(failure);
        }
    };

    function success() {
        console.log('success');
        vm.success = "Registerd successfully!";
    }

    function failure() {
        console.log('failed to register');
        vm.success = "";

    }

}