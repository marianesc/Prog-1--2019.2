var u;
var headers_timestamp = null;
var serverDate = null;
var serverDelta = 0;

function waitFirebaseToken() {
    function repeat(resolve) {
        if (user_token.token) {
            resolve(user_token);
        } else {
            setTimeout(function () {repeat(resolve)}, 0);
        }
    }
    return new Promise(function (resolve, reject) {
        repeat(resolve);
    });
}

(function(){
    'use strict';
    var MAX_OPEN = 3;

    angular.module('tst').service('user', [ '$q', '$http', '$cacheFactory', '$timeout', User ]);

    function User($q, $http, $cacheFactory, $timeout) {
        var user = this;
        u = user; 

        function remaining_time(datetime) {
            var remaining = (new Date(datetime).getTime() - (new Date().getTime()) + serverDelta) / 1000
            return remaining;
        }

        // service public data
        user.loaded = undefined;

        // service public API
        user.load = load;
        async function load() {
            user.loaded = user.loaded || false;
            const token = await waitFirebaseToken();

            const promise = fetch(api_url + '/user', {
                method: 'GET',
                cache: 'no-cache',
                headers: { 'Authorization': 'Bearer ' + user_token.token }
            })
            .then(function (response) {
                headers_timestamp = response.headers.get('Date') || response.headers.get('date');
                serverDate = new Date(headers_timestamp);
                serverDelta = new Date().getTime() - serverDate.getTime();

                return response.json();
            })
            .then(function (data) {
                window.resposta = data;
                Object.assign(user, data);
                user.assignments = _.sortBy(user.assignments, function (a) {
                    return a.close_datetime || a.open_datetime || a.create_datetime;
                }).reverse();
                user.assignments.forEach(a => new Assignment(a));

                user.units_list = ['expressoes', 'programas'];
                user.unit_filter = 'expressoes';

                if (user.deadline && user.deadline !== '-' && user.deadline.indexOf('Z') < 0) {
                    // change deadline to indicate that it is a universal time datetime
                    user.deadline = user.deadline + "Z";
                }
                user.loaded = true;
                if (user.challenge && user.challenge_state() === 'configuration') {
                    const time_to_wait = moment(user.challenge.start_datetime).diff(new Date());
                    console.log(`waiting until challenge start and reload user  (${time_to_wait})`); 
                    $timeout(function () {
                        console.log('time to reload user...');
                        user.load();
                    }, time_to_wait);
                }
            })
            .catch(function (error) {
                console.error(data);
            });

            return $q.when(promise);
        }

        user.load_old = load_old;
        async function load_old() {
            var defer = $q.defer();
            user.loaded = user.loaded || false;

            const token = await waitFirebaseToken();

            $http({
                method: 'GET',
                url: api_url + '/user',
                cache: false,
                headers: {'Authorization': 'Bearer ' + user_token.token}
            }).then(function(response) {

                // use server's datetime as a reference
                headers_timestamp = response.headers()['Date'] || response.headers()['date']
                serverDate = new Date(headers_timestamp);
                serverDelta = new Date().getTime() - serverDate.getTime();

                var data = response.data;
                _.each(data.assignments, function (a, index) {
                    _.extend(a, {index: index})
                })

                data.assignments = _.sortBy(data.assignments, function (a) {
                    return a.close_datetime || a.open_datetime || a.create_datetime;
                }).reverse();

                for (var i=0; i<data.assignments.length; i++) {
                    data.assignments[i] = new Assignment(data.assignments[i]);
                }

                _.extend(user, data);
                if (user.current_group) {
                    user.current_unit = user.groups[user.current_group].current_unit;
                    user.progress_units = user.groups[user.current_group].units;
                    user.units_list = user.progress_units;
                    user.unit_filter = user.current_unit;
                }

                if (user.deadline && user.deadline !== '-' && user.deadline.indexOf('Z') < 0) {
                    // change deadline to indicate that it is a universal time datetime
                    user.deadline = user.deadline + "Z";
                }
                user.loaded = true;
                defer.resolve();
            }, function(data) {
                console.error(data);
                defer.reject(data);
            });

            return defer.promise;
        }

        user.units = function () {
            return Student.prototype.units.apply(user);
        }

        user.challenge_state = function challenge_state() {
            if (!user.challenge) {
                return undefined;
            }

            const open = new Date(user.challenge.open_datetime).getTime();
            const start = new Date(user.challenge.start_datetime).getTime();
            const end = new Date(user.challenge.end_datetime).getTime();
            const close = new Date(user.challenge.close_datetime).getTime();
            const now = Date.now();

            if (now > close) {
                return "closed";
            }
            else if (now > end) {
                return "ended";
            }
            else if (now > start) {
                return "running";
            }
            else if (now > open) {
                return "open";
            }

            // now > end
            return "planned";
        }

        user.challenge_state_deprecated = function challenge_state_deprecated() {
            if (!user.challenge) {
                return undefined;
            }

            if (remaining_time(user.challenge.start_datetime) > 0) {
                return "configuration";
            } else if (remaining_time(user.challenge.end_datetime) > 0) {
                return "running";
            } else {
                return "ended";
            }
        }

        user.role = function role(groupname) {
            if (!user.groups || !user.current_group) {
                return 'student';
            }
            var group = user.groups[user.current_group];
            if (!group) {
                return 'student';
            }

            return group.role || 'student';
        }

        user.toggle_unit_lock = function toggle_unit_lock(student, unit) {
            var defer = $q.defer();

            var new_state = student.unit_state(unit) == 'locked' ? 'unlocked' : 'locked';
            $http({
                method: 'PATCH',
                url: api_url + '/user/' + student.email,
                cache: false,
                data: '[{"op":"replace", "path":"/groups/prog1-20161/units/' + unit + '/state", "value": "' + new_state + '"}]',
                headers: {'Authorization': 'Bearer ' + user_token.token}
            }).then(function(response) {
                defer.resolve();
            });

            return defer.promise;
        }


        user.update_student = function update_student(student) {
            var defer = $q.defer();
            // in the future, resolve the promise
            $http({
                method: 'GET',
                url: student.url,
                cache: true,
                headers: {'Authorization': 'Bearer ' + user_token.token}
            }).success(function(data) {
                _.extend(student, data);
                defer.resolve();
            }).error(function(data) {
                user.reading_students = false;
                window.location.replace(api_url + '/login');
            });

            return defer.promise;
        }


        user.select_student = function select_student(student) {
            user.selected_student = student;
            if (!student.name) {
                user.update_student(student);
            }
        }


        user.get_new_assignment = function get_new_assignment(unit) {
            // TODO: add exponential backup to retries
            var fail_count = 0;
            var defer = $q.defer();
            var payload = { "user": user.email, "group": user.current_group }
            if (unit) {
                // only add a unit field if required
                payload.unit = unit;
            }
            var request = {
                method: 'POST',
                url: api_url + '/assignment',
                cache: false,
                data: JSON.stringify(payload),
                headers: {'Authorization': 'Bearer ' + user_token.token}
            };
            do_request();
            return defer.promise;

            // private function 
            function do_request() {
                $http(request).then(function(response) {
                    defer.resolve(response);
                }, function(response) {
                    fail_count++;
                    console.error(`POST ${api_url}/assignment failed (fail ${fail_count})`);
                    console.error(response);
                    if (fail_count < 3) {
                        do_request();
                        return;
                    } else {
                        defer.reject(response.data.messages[0]);
                    }
                });
            }
        }


        user.update_new_assignments = function update_new_assignments() {
            var pode_novos_assignments = _.countBy(user.assignments, function(aentry) {
                  return aentry.unit == (user.unit_filter || user.current_unit) && (aentry.state == 'open' || aentry.state == 'new');
            }).true < MAX_OPEN;

        }


        function original_load() {
            var defer = $q.defer();
            user.loaded = user.loaded || false;

            $http({
                method: 'GET',
                url: api_url + '/user',
                cache: false,
                headers: {'Authorization': 'Bearer ' + user_token.token}
            }).then(function(response) {
                headers_timestamp = response.headers()['Date'] || response.headers()['date']
                serverDate = new Date(headers_timestamp);
                serverDelta = new Date().getTime() - serverDate.getTime();
                var data = response.data;
                _.each(data.assignments, function (a, index) {
                    _.extend(a, {index: index})
                })

                data.assignments = _.sortBy(data.assignments, function (a) {
                    return a.close_datetime || a.open_datetime || a.create_datetime;
                }).reverse();

                for (var i=0; i<data.assignments.length; i++) {
                    data.assignments[i] = new Assignment(data.assignments[i]);
                }
                _.extend(user, data);
                if (user.current_group) {
                    user.current_unit = user.groups[user.current_group].current_unit;
                    user.progress_units = user.groups[user.current_group].units;
                    user.units_list = user.progress_units;
                    user.unit_filter = user.current_unit;
                }
                if (user.deadline && user.deadline !== '-' && user.deadline.indexOf('Z') < 0) {
                    // change deadline to indicate that it is a universal time datetime
                    user.deadline = user.deadline + "Z";
                }
                user.loaded = true;
                defer.resolve();
            }, function(data) {
                console.error(data);
                defer.reject(data);
            });

            return defer.promise;
        }

                
        user.load_ranking = function load_ranking(reload) {
            var defer = $q.defer();
            user.reading_ranking = true;
            // in the future, resolve the promise
            $http({
                method: 'GET',
                url: api_url + '/group/' + user.current_group + '/ranking?user=' + user.email,
                headers: {'Authorization': 'Bearer ' + user_token.token}
            }).success(function(data) {
                user.reading_ranking = false;
                user.ranking = data;
                defer.resolve();
            }).error(function(data) {
                user.reading_students = false;
                window.location.replace(api_url + '/login');
            });

            return defer.promise;
        }


        user.load_students = function load_students(reload) {
            var defer = $q.defer();
            user.reading_students = true;
            // in the future, resolve the promise
            $http({
                method: 'GET',
                url: api_url + '/group/' + user.current_group + '/students',
                cache: true,
                headers: {'Authorization': 'Bearer ' + user_token.token}
            }).success(function(data) {
                user.reading_students = false;
                data = _.sortBy(data, function(s) { return s.email;} )
                for (var i=0; i<data.length; i++) {
                    data[i] = new Student(data[i]);
                }
                user.students = data;
                defer.resolve();
            }).error(function(data) {
                user.reading_students = false;
                window.location.replace(api_url + '/login');
            });

            return defer.promise;
        }


        user.assignment_change_state = function assignment_change_state(assignment, state) {
            var defer = $q.defer();

            $http({
                method: 'PATCH',
                url: api_url + '/assignment/' + assignment.iid,
                cache: false,
                data: '[{"op":"replace", "path":"/state", "value": "' + state + '"}]',
                headers: {'Authorization': 'Bearer ' + user_token.token}
            }).then(function(response) {
                // assignment state was changed
                defer.resolve(response)
            }, function(reason){
                // oops! we couldn't change the state of the assignment
                defer.reject(reason)
            });

            return defer.promise;
        }


        function OLD_open_assignment(assignment) {
            var defer = $q.defer();

            $http({
                method: 'PATCH',
                url: api_url + '/assignment/' + assignment.key,
                cache: false,
                data: '[{"op":"replace", "path":"/state", "value":"open"}]',
                headers: {'Authorization': 'Bearer ' + user_token.token}
            }).then(function(response) {
                // assignment is open
                defer.resolve(response)
            }, function(reason){
                // oops! we couldn't open the assignment
                defer.reject(reason)
            });

            return defer.promise;
        }


        // TODO: remove this function
        user.is_correct_duplicated = function simple_check(quiz) {
            if (!('answer' in quiz) || !('expect' in quiz))
                return undefined;

            if (!quiz.answer || !quiz.expect)
                return undefined;

            var answer = quiz.answer;
            var expect = quiz.expect;
            
            if (quiz.ignorecase) {
                answer = answer.toLowerCase();
                expect = expect.toLowerCase();
            }

            return answer == expect;
        }


        // load more data of an assignment
        user.load_assignment = function load_assignment(assignment) {
            var defer = $q.defer();
            console.log('load_assignment() reading assignment');
            $http({
                method: 'GET',
                url: api_url + '/assignment/' + assignment.key,
                cache: false,
                headers: {'Authorization': 'Bearer ' + user_token.token}
            }).then(function(response) {

                // update assignment with data received
                _.extend(assignment, response.data);

                // TODO: let controller access text and quizzes directly from
                //       assignment.activity or let it put them in viewmodel
                assignment.text = assignment.activity.text;
                assignment.quizzes = assignment.activity.quizzes;

                if (assignment.state === 'new') {
                    defer.resolve(response.data);
                    return;
                }

                // update text with label as title, if needed
                if (assignment.text.trim().slice(0,2) != "# ")
                    assignment.text = "# " + assignment.label + "\n" + assignment.text;

                // prepare data stucture to store new answers
                assignment.new_answers = {};
                for (var quiz_name in assignment.quizzes) {
                    assignment.new_answers[quiz_name] = [];
                }

                // update answers shown to the user
                for (var quiz_name in assignment.quizzes) {

                    // set default answer
                    assignment.quizzes[quiz_name].answer = "";

                    // lookup most recent answer for quiz_name
                    var idx_last_saved = _.findLastIndex(assignment.answers, function(a) {return quiz_name in a})
                    if (idx_last_saved >= 0) {
                        var answer = _.last(assignment.answers[idx_last_saved][quiz_name])
                        assignment.quizzes[quiz_name].answer = answer
                    }

                    // update feedback
                    var quiz = assignment.quizzes[quiz_name];
                    assignment.quizzes[quiz_name].is_correct = user.is_correct_duplicated(quiz)
                }

                // disable save button
                assignment.answers_saved = true;
                defer.resolve(response.data);

            }, function(response) {
                console.error(`GET ${api_url}/assignment/${assignment.key} FAILED!`);
                console.log(response);
                defer.reject(response);
            });

            return defer.promise;
        }


        user.save_assignment = function save_assignment() {
            console.log("Starting process to save assignment's answers...")
            var assignment = user.selected;
            var quizzes = assignment.quizzes;
            var defer = $q.defer();

            // collect answers from new_answers
            var answers = {}
            for (var quiz_name in assignment.new_answers) {
                if (!_.isEmpty(assignment.new_answers[quiz_name]))
                    answers[quiz_name] = assignment.new_answers[quiz_name]
            }

            // resolve promise if there is nothing to do
            if (_.isEmpty(answers)) {
                defer.resolve();
                console.log("No answers to save... process ended")
                return defer.promise;
            }

            // prepare message to send to server
            var jsonpatch = JSON.stringify([{
                "op":"add",
                "path":"/answers",
                "value": answers
            }]);

            // send data to the server
            $http({
                method: 'PATCH',
                url: api_url + '/assignment/' + user.selected.key,
                cache: false,
                data: jsonpatch,
                headers: {'Authorization': 'Bearer ' + user_token.token}
            }).success(function(){

                // delete answers saved from new_answers
                for (quiz_name in quizzes)
                    assignment.new_answers[quiz_name] = []

                // delete assignment from $http cache
                var $httpCache = $cacheFactory.get('$http');
                $httpCache.remove(api_url + '/assignment/' + user.selected.key);

                // disable save button
                assignment.answers_saved = true;

                console.log("All the wanswers were saved... process ended")

            }).error(function(reason){
                alert("Aparentemente, o tempo da atividade se esgotou.");
                console.error("We've had problems while saving answers...");
            });

            return defer.promise;
        }

    }

})();
