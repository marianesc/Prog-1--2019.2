var vm;

(function(){

    var tst = angular.module('tst');
    tst.controller('NewGroupCtrl', NewGroupCtrl);

    function NewGroupCtrl(user, GroupService, msgToast, $timeout, $location, $state, $mdDialog, $mdMedia, $http, $cacheFactory) {
        vm = this;

        vm.url_parts = $location.url().split('/');
        vm.group_name = vm.url_parts[2];

        vm.loading = true;
        GroupService.get_by_id(vm.group_name)
        .then(function (group) {
            vm.loading = false;
            vm.group = group;
        }, function (data, status) {
            console.error('problema ao ler grupo no servidor');
            vm.erro = {data: data, status: status}
        });

        vm.set_top_unit = function (student, unit) {
            student.updating_unit = true;
            GroupService.update_unit(student.email, unit, vm.group_name)
            .then(function () {
                student.top_unit = unit;
                delete student.updating_unit;
            }, function () {
                delete student.updating_unit;
                // TODO: avisar o usuario
            })
        }

        vm.update_mode = function (student, mode) {
            console.log('vm.update_mode');
            student.updating_mode = true;
            GroupService.update_mode(student.email, mode, vm.group_name)
            .then(function () {
                console.log('vm.update_mode: success callback');
                student.mode = mode;
                delete student.updating_mode;
            }, function () {
                console.log('vm.update_mode: fail callback');
                delete student.updating_mode;
                // TODO: avisar o usuario
            })
        }

        vm.update_status = function () {
            vm.updating_status = true;
            GroupService.get_by_id(vm.group_name)
            .then(function (group) {
                vm.group = group;
                delete vm.updating_status;
            }, function (data, status) {
                console.error('problema ao ler grupo no servidor');
                vm.erro = {data: data, status: status}
                delete vm.updating_status;
            });
        }
    }

})();
