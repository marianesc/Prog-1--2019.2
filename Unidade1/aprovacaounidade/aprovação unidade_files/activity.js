'use strict';
var vm;

(function () {
    var app = angular.module('tst');

    app.service('ActivityService', function ActivityService($http) {

        // Service API
        this.get_by_id = function get_by_id(name) {
            var promise = $http({
                method: 'GET',
                url: api_url + '/activity/' + name,
                cache: true,
                headers: {'Authorization': 'Bearer ' + user_token.token}
            }).then(function (response) {
                var data = response.data;
                if (data.hasOwnProperty('new_tests')) {
                    data.tests = data.new_tests[0];
                    delete data.new_tests;
                }
                return new Activity(data);
            });
            
            return promise;
        }
    });
    
    app.controller('ActivityCtrl', function ActivityCtrl(user, ActivityService, $location, $mdDialog, $scope) {
        vm = this;
        vm.comments = [];
        vm.editing = false;

        vm.delete_comment = function(index) {
            return vm.activity.comments.splice(index, 1);
        }

        vm.delete_file = function(fname) {
            delete vm.edit_copy.files[fname]
        }

        vm.toggle_edit = function (ev) {
            if (!vm.editing) {
                vm.editing = !vm.editing;
                vm.edit_mode = 'text';
                //vm.edit_copy = new Activity(_.cloneDeep(vm.activity));
                vm.edit_copy = vm.activity.copy()
                console.lo
                return;
            }

            var confirm = $mdDialog.confirm()
                .title('Salvar ou descartar alterações?')
                .ariaLabel('Salvar')
                .targetEvent(ev)
                .ok("Salvar")
                .cancel('Descartar');

            $mdDialog.show(confirm).then(function() {
                // salvar
                alert('salvar a activity; to be done...');
            }, function() {
                // descartar
            }).finally(function() {
                vm.editing = !vm.editing;
                vm.edit_mode = 'text';
            });
        }

        vm.select_test = function (index) {
            // save currently selected test
            if (typeof vm.chosen_test == 'number') {
                vm.edit_copy.tests[vm.chosen_test] = jsyaml.load(vm.yaml_editor);
            }
            vm.chosen_test = index;
            vm.yaml_editor = jsyaml.dump(vm.edit_copy.get_test_object(index));
        }

        vm.select_settings = function (index) {
            vm.chosen_test = null;
            var settings = {
                "owner": vm.activity.owner,
                "name": vm.activity.name,
                "label": vm.activity.label,
                "author": vm.activity.author,
                "version": vm.activity.version,
                "state": vm.activity.state,
                "sequel": vm.activity.sequel,
                "viewers": vm.activity.viewers,
                "collaborators": vm.activity.collaborators,
                "type": vm.activity.type
            }
            vm.yaml_editor = jsyaml.dump(settings);
        }

        vm.update_from_yaml = function (index) {
            var tests = vm.edit_copy.tests;
            var PROPERTIES = ['category', 'type', 'input', 'output', 'name', 'script'];
            vm.valid_tests = true;
            vm.msg = "ok";

            // validate yaml
            if (typeof index === 'undefined') {
                try {
                    tests = jsyaml.load(vm.tests_yaml || "[]");
                } catch (erro) {
                    vm.valid_tests = false;
                    vm.msg = "invalid yaml";
                    return;
                }
            } else {
                try {
                    tests[index] = jsyaml.load(vm.yaml_editor);
                } catch (erro) {
                    vm.valid_tests = false;
                    vm.msg = "invalid yaml";
                    return;
                }
            }

            // validate mandatory io properties
            for (var i=0; i < tests.length; i++) {
                if (tests[i].type == 'io') {
                    if (!_.has(tests[i], "input") || !_.has(tests[i], "output")) {
                        vm.valid_tests = false;
                        vm.msg = "missing either input or output property in io test #" + (i+1);
                        return;
                    }
                }
            }

            // validate mandatory script properties
            for (var i=0; i < tests.length; i++) {
                if (tests[i].type == 'script') {
                    if (!_.has(tests[i], "script")) {
                        vm.valid_tests = false;
                        vm.msg = "missing script property in script test #" + (i+1);
                        return;
                    }
                }
            }

            // validate properties
            for (var i=0; i < tests.length; i++) {
                for (var prop in tests[i]) {
                    if (! _.includes(PROPERTIES, prop)) {
                        vm.valid_tests = false;
                        vm.msg = "unknown property: " + prop + " in test #" + (i+1);
                        return;
                    }
                }
            }

            
        }

        function get_tests_yaml() {
            var tests = vm.activity.tests;
            var data = [];
            var test_object;
            for (var i=0; i<tests.length; i++) {
                test_object = vm.activity.get_test_object(i);
                data.push(test_object);
            }
            return jsyaml.dump(data);
        }

        vm.time = function (comment) {
            var index = comment.lastIndexOf('\n');
            return comment.slice(index + 1).split(" ")[1];
        }

        vm.user = function (comment) {
            var index = comment.lastIndexOf('\n');
            return comment.slice(index + 1).split(" ")[0];
        }

        vm.text = function (comment) {
            var index = comment.lastIndexOf('\n');
            return comment.slice(0, index);
        }

        vm.lines_in_text = function () {
            return vm.activity.text.split(/\r\n|\r|\n/).length;
        }

        vm.toggle_editing = function () {
            vm.editing = !vm.editing;
        }

        function load() {
            vm.loading = true;
            user.load().then(function () {
                // identify activity name from location
                vm.activity_name = $location.url().split('/')[2];

                ActivityService.get_by_id(vm.activity_name).then(function (activity_instance) {
                    vm.loading = false;
                    vm.activity = activity_instance;
                    vm.comments = _.filter(vm.activity.comments, c => ! _.includes(["", "null"], vm.text(c).trim()));
                    vm.tests_yaml = get_tests_yaml();
                    vm.valid_tests = true;
                }, function () {
                    vm.loading = false;
                    vm.changed = false;
                });
            })
        }

        load();

    });
    
    
})()
