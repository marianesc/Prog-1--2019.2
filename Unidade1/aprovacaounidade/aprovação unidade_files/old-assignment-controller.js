var vm;

function isdigit(val) { return  /^\d+$/.test(val); }

(function () {

    var tst = angular.module('tst');
    tst.controller('OldAssignmentCtrl', OldAssignmentCtrl);

    function OldAssignmentCtrl(user, msgToast, $window, $timeout, $location, $state, $mdDialog, $mdMedia, $q, $http, $cacheFactory) {
        vm = this;

        Object.defineProperties(vm, {
            assignment: { get: function () {return user.selected;} }
        });

        initialize();

        function initialize() {
            vm.loading = true;
            user.load()
            .then(function() {
                let unit, activity_name;
                var key = $location.url().split('/')[2];
                vm.url = $location.url().split('/');
                vm.key = vm.url[2];
                vm.answer = vm.url[3];

                if (isdigit(key)) {
                    // key is an integer id
                    user.selected = user.assignments.find(a => a.key === key);
                    if (!user.selected) {
                        $state.go('app.new_assignment', {key:key});
                    }
                } else if (!isdigit(key)) {
                    // key is literal specification of an activity
                    [unit, activity_name] = key.split("!");
                    user.selected = user.assignments.find(a => a.unit === unit && a.name === activity_name);
                    if (user.selected && user.selected.key) {
                        $state.go('app.assignment', {key:user.selected.key}, {location: 'replace'})
                        return;
                    }
                }

                if (!user.selected) {
                    user.selected = {
                        'name': activity_name,
                        'unit': unit,
                        'state': 'new'
                    }
                }

                user.selected.count_easy = 0;
                user.selected.count_hard = 0;
                vm.last_saved_checkout_name = user.selected.checkout_name;

                if (vm.assignment.state === "new") {
                    // NEW assignment
                    open_new(vm.assignment, activity_name, unit);

                } else {
                    // OLD assignment
                    open_old_activity(vm.key);
                }
                watch_user();

            })
            .catch(function (error) {
                vm.loading = false;
                alert('ERRO: não foi possível ler dados do usuário');
                console.log(error);
            })

        }

        function fullscreen(element) {
            if (element.requestFullscreen) element.requestFullscreen();
            else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
            else if (element.webkitRequestFullscreen) element.webkitRequestFullscreen();
            else if (element.msRequestFullscreen) element.msRequestFullscreen();
        }

        function cancel_quiz(from) {
            if (sha1(localStorage.getItem('uaid') || '') === '6556df49a3a6b71807022bd6e45afd613a3243ef' || !vm.quiz || vm.assignment.state !== 'open') {
                return;
            }

            // remove quiz from DOM
            let $text = document.getElementById('text');
            $text.style.visibility = "hidden";

            // cancel assignment in server
            commit_quiz_answer({auto: true})
            .then(function () {

                // remove from vm and from model
                $text.parentElement.removeChild($text);
                delete vm.quiz;
                delete vm.assignment.quiz;
                user.assignment_change_state(user.selected, 'canceled')

                // cancel assignment locally
                user.selected.state = 'canceled';
            });
        }

        vm.enable_close_assignment = function enable_close_assignment() {
            if (vm.assignment.state !== 'open' || !vm.is_mine()) {
                return false;
            }

            else if (vm.assignment.type === 'lesson') {
                return true;
            }

            else if (vm.assignment.type ===  'problem') {
                return vm.is_mine() && passes_tests(vm.assignment.current_answer);
            }

            else if (vm.assignment.type ===  'quiz') {
                return true;
            }

            _assert(false, 'unforeseen condition');
        };

        vm.enable_send_to_worker = function enable_send_to_worker() {
            if (vm.assignment.state === 'closed') {
                return false;
            }

            if (vm.assignment.type === 'lesson') {
                return false;
            }

            if (vm.assignment.type === 'quiz') {
                return vm.quiz && vm.quiz.changed;
            }

            if (vm.assignment.type === 'problem') {
                return vm.worker_req_status !== 'waiting' && vm.assignment.current_answer && !vm.assignment.current_answer.__results;
            }

            // TODO: remove return below
            //       it seems to occur when a non-existing activity
            //       is requested;
            return false;
            _assert(false, 'condition not foreseen!');
        };

        vm.update_quiz_answers = function update_quiz_answers(current_answer) {
            if (!current_answer) return; 
            _assert(vm.quiz, 'no vm.quiz');
            _assert(current_answer['__filename'] === 'answers.qz', 'no "answers.qz" file in current_answer');

            let answers = JSON.parse(current_answer['__code']);
            vm.quiz.quizzes.forEach((quiz, i) => {
                quiz.answer = answers[quiz.id];
                if (current_answer.__results) {
                    quiz._result = current_answer.__results.summary[i];
                }
            });
            vm.quiz.changed = false;
        };

        vm.quiz_changed = function quiz_changed() {
            $timeout(function () {
                vm.quiz.changed = true;
            });
        };

        vm.poll_for_results = function poll_for_results(count=0) {
            if (count == 12) {
                msgToast.show('Worker parece estar offline');
                vm.worker_req_status = 'offline';
                return;
            }

            vm.worker_req_status = 'waiting';
            let url = vm.assignment.assignment_url + '/validation';
            let headers = {'Authorization': 'Bearer ' + user_token.token};
            let worker_results = fetch(url, {method:'GET', headers});

            $q.when(worker_results)
            .then(r => r.json())
            .then(updated_results => {
                if (updated_results.__results) {
                    msgToast.show('Resultados do worker recebidos');
                    vm.worker_req_status = 'received';
                    //vm.assignment.current_answer.__code = JSON.stringify(vm.quiz_answers());
                    Object.assign(vm.assignment.current_answer, updated_results);
                    if (vm.assignment.type === 'quiz') {
                        vm.update_quiz_answers(vm.assignment.current_answer);
                    }
                } else {
                    console.log('waiting 3s...');
                    $timeout(_ => {vm.poll_for_results(count + 1)}, 3000);
                }
            })
            .catch(function (err) {
                console.log(err);
                return err;
            })
        }

        vm.send_to_worker = function send_to_worker() {
            function answer_sent_to_worker() {
                return vm.assignment.current_answer && vm.assignment.current_answer.__results || vm.worker_req_status === 'waiting';
            }

            _assert(['problem', 'quiz'].includes(vm.assignment.type), 'assignment is not problem or quiz')
            _assert(!(vm.assignment.type === 'problem') || !answer_sent_to_worker(), 'answer already sent to the worker')
            _assert(!(vm.assignment.type === 'quiz') || vm.quiz.changed, 'answer not been changed')

            commit_quiz_answer()
            .then(function (updated_answer) {
                if (typeof(vm.assignment.current_answer) === 'undefined') {
                    vm.assignment.current_answer = {}
                };
                Object.assign(vm.assignment.current_answer, updated_answer);
                let url = vm.assignment.assignment_url + '/validation';
                let headers = {'Authorization': 'Bearer ' + user_token.token};
                let validation_requested = fetch(url, {method:'POST', headers});
                msgToast.show('Enviando resposta ao worker');
                $q.when(validation_requested)
                .then(_ => { vm.poll_for_results(1); });
            })
            .catch(function (err) {
                console.error("Ops! problems when sending answer to worker!");
                console.log(err);
            });
        };

        function commit_quiz_answer(options={auto: false}) {
            if (vm.assignment.type !== 'quiz' || !vm.quiz.changed) {
                return $q.when(Promise.resolve());
            }

            let answers = vm.quiz_answers();
            if (options.auto === true) {
                answers['_auto'] = true;
            }
            let content = JSON.stringify(answers) + '\n';
            let checksum = sha1(content);
            let promise = fetch(api_url + "/" + vm.assignment.key + '/answers', {
                method: 'POST',
                body: JSON.stringify({
                    files: [{
                            'name': 'answers.qz',
                            'content': content,
                            'mode': 'rw',
                            'category': 'public',
                            'hash': checksum
                        }],
                    hash: checksum
                }),
                redirect: 'follow',
                headers: {'Authorization': 'Bearer ' + user_token.token}
            })
            .then(r => r.json());

            return $q.when(promise);
        };

        vm.num_fails = function num_fails(answer) {
            let fails = vm.fails(answer);
            if (fails === undefined) return undefined;

            return fails.length;
        }

        vm.fails = function num_fails(answer) {
            if (typeof(answer.__results) === 'undefined') return undefined;
            if (typeof(answer.__results.summary) === 'undefined') return undefined;
            let summary = answer.__results.summary;

            return summary.split('').reduce((fails, c) => fails + (c !== '.' ? c : ''), '');
        }

        function passes_tests(answer) {
            if (typeof answer === 'undefined') return false;
            if (typeof answer.__results  === 'undefined') return false;
            if (typeof answer.__results.summary  === 'undefined') return false;

            let summary = answer.__results.summary;

            return summary.split('').every(c => c === '.');
        }

        vm.is_worker_available = function worker_available() {
            // TODO: this function will be used to control
            //       the number of times the user will be allowed
            //       to use the worker; currently, we only see if
            //       the last summary contains any '-', indicating
            //       that the test results are being masked and that
            //       the worker will no longer send results; the current
            //       worker adds a '-' at the end of the summary string
            //       at the last valid test summary; after that, all
            //       summaries will contain a '-' for each test;
            let answer = vm.assignment.current_answer;
            if (typeof answer === 'undefined') return true;
            if (typeof answer.__results  === 'undefined') return true;
            if (typeof answer.__results.summary  === 'undefined') return true;

            let summary = answer.__results.summary;

            return summary[summary.length - 1] !== '-';
        }

        vm.is_mine = function is_mine() {
            return vm.assignment.user === user.email;
        }

        vm.update_summary = function () {
            const validation_url = `${api_url}/assignment/${vm.assignment.key}/validation`;
            const promise = fetch(validation_url, {
                method: 'GET',
                redirect: 'follow',
                headers: {'Authorization': 'Bearer ' + user_token.token}
            });

            return $q.when(promise)
            .then(function (response) { 
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.statusText);
            })
            .then(function (data) {
                vm.assignment.summary = data['summary'];
            })
            .catch(function (r) {
                console.log("couldn't update assignment summary");
                console.log(r);
            });
            
        }

        vm.is_closeable = function is_closeable() {
            if (vm.assignment.state !== 'open') {
                return false;
            }

            else if (vm.assignment.type === 'lesson' || vm.assignment.type === 'quiz') {
                return true;
            }

            else if (vm.assignment.type === 'problem') {
                return passes_tests(vm.assignment.current_answer);
            }

        }

        vm.quiz_answers = function quiz_answers() {
            let $quizzes = document.querySelectorAll("qz-short");
            let answers = {};
            $quizzes.forEach($q => {
                answers[$q.id.slice(2)] = $q.value;
            });
            return answers;
        }

        vm.reload = function reload() {
            user.load_assignment(user.selected)
            .then(function () {
                vm.loading = false;
            })
            .catch(function (error) {
                vm.loading = false;
                console.error(error);
            });
            return;
        }

        vm.set_difficulty = function set_difficulty(difficulty) {
            if (difficulty === vm.assignment.difficulty)
                difficulty = 'medium';

            var previous_difficulty = vm.assignment.difficulty;
            vm.assignment.difficulty = difficulty;
            vm.assignment.activity.count_easy = vm.assignment.activity.count_easy + (vm.assignment.difficulty == 'easy' ? 1 : 0)
            vm.assignment.activity.count_hard = vm.assignment.activity.count_hard + (vm.assignment.difficulty == 'hard' ? 1 : 0)
            var patch = [{op: "replace", path:"/difficulty", value: difficulty}]
            $http({
                method: 'PATCH',
                url: api_url + '/assignment/' + user.selected.key,
                cache: false,
                data: JSON.stringify(patch),
                headers: {'Authorization': 'Bearer ' + user_token.token}
            }).then(function (response) {
                // everything already done in an optimistic way
                vm.assignment.activity.count_easy = response.data.activity.count_easy;
                vm.assignment.activity.count_hard = response.data.activity.count_hard;
            }, function () {
                vm.assignment.difficulty = previous_difficulty;
                vm.assignment.count_easy = vm.assignment.activity.count_easy;
                vm.assignment.count_hard = vm.assignment.activity.count_hard;
            })
        }

        vm.new_close_assignment = function () {
            let answer_saved;
            if (vm.assignment.type === 'quiz') {
                answer_saved = commit_quiz_answer();
            } else {
                answer_saved = Promise.resolve();
            }

            answer_saved
            .then(function () {
                vm.close_assignment();
            })
        };

        vm.close_assignment = function close_assignment(ev) {
            vm.minutes_open = Math.floor((moment.now() - moment(vm.assignment.open_datetime + 'Z')) / 1000 / 60);
            var useFullScreen = $mdMedia('xs');
            $mdDialog.show({
                controllerAs: 'dialog',
                controller: function(user, $scope, $mdDialog) {
                    var dialog = this;
                    dialog.vm = vm;
                    dialog.vm.count = 0;
                    $scope.hide = function() { $mdDialog.hide(); };
                    $scope.answer = function(answer) { $mdDialog.hide(answer); };
                    $scope.cancel = function() { $mdDialog.cancel(); };
                },
                templateUrl: 'partial/close_dialog.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                fullscreen: useFullScreen
            })
            .then(function (newstate) {
                user.assignment_change_state(user.selected, newstate)
                .then(function () {
                    user.selected.state = newstate;
                    $state.go('app.home')
                }, function (response) {
                    alert("ERRO ao mudar estado de atividade: " + response.data.messages[0]);
                });
            }, function () {
                console.log('concluir atividade cancelada');
            });
        }

        vm.reset_feedback = function reset_feedback(id, $event) {
            delete user.selected.quizzes[id].is_correct;
        }

        // a support function to escape answer
        vm.escape = function escape(s) {
            return escape(s);
        }

        vm.evaluate_answer = function evaluate_answer(quiz_id) {

            var quiz = user.selected.quizzes[quiz_id];
            quiz.is_correct = undefined;

            // enabled save button
            if (quiz.answer) {
                user.selected.new_answers[quiz_id].push(quiz.answer);
                quiz.is_correct = vm.is_correct(quiz)
                user.selected.answers_saved = false;
            }

        }

        vm.new_answer = function new_answer(answer) {
            var is_new = !_.includes(user.old_answers, answer.__timestamp);
            return is_new;
        }

        vm.is_correct = function is_correct(quiz) {
            // TODO: observe that expected answer should not be ""!!!
            if (!quiz.answer || !quiz.expect)
                return undefined

            answer = quiz.answer;
            expect = quiz.expect;
            
            if (quiz.ignorecase) {
                answer = answer.toLowerCase();
                expect = expect.toLowerCase();
            }

            return answer == expect;
        }
        
        vm.save_comment = function save_comment() {
            $http({
                method: 'PATCH',
                url: api_url + '/assignment/' + user.selected.key,
                cache: false,
                data: '[{"op":"replace", "path":"/comment", "value":"' + vm.assignment.comment + '"}]',
                headers: {'Authorization': 'Bearer ' + user_token.token}
            }).then(function (response) {
                msgToast.show('Comentário salvo');
            }, function (data, status) {
                var msg = "ERRO: não foi possível salvar o comentário (" + status + ")";
                rresp = data;
            });
        }

        vm.rows = function rows() {
            var output = ((vm.user_output || "").match(/\n|\r|\r\n/g) || []).length;
            var input = ((vm.user_input || "").match(/\n|\r|\r\n/g) || []).length;
            return Math.max(Math.max(output, input) + 1, 4);
        }

        vm.toggle_archive = function toggle_archive(assignment) {
            const archive_url = `${api_url}/assignment/${assignment.key}/archive`;
            const unarchive_url = `${api_url}/assignment/${assignment.key}/unarchive`;
            const promise = fetch(assignment.archived ? unarchive_url : archive_url, {
                method: 'POST',
                redirect: 'follow',
                headers: {'Authorization': 'Bearer ' + user_token.token}
            });

            return $q.when(promise)
            .then(function (r) { 
                assignment.archived = !assignment.archived;
                $state.go('app.home')
            })
            .catch(function (r) {
                msgToast.show(`Não foi possível ${assignment.archived ? 'des' : ''}arquivar a atividade...`);
                $state.go('app.home')
            });

        }

        vm.save_new_checkout_name = function save_new_checkout_name(newname) {
            if (! valid_name(newname)) {
                msgToast.show('Nome inválido')
                return
            }
                
            msgToast.show('Salvando novo nome');
            $http({
                method: 'PUT',
                url: api_url + '/assignment/' + user.selected.key + '/checkoutname',
                cache: false,
                data: newname,
                headers: {'Authorization': 'Bearer ' + user_token.token}
            }).then(function (response) {
                console.log('Novo nome salvo');
                document.getElementById('testando').blur();
                vm.assignment.last_saved_checkout_name = newname;
            }, function (data, status) {
                var msg = "ERRO: não foi possível salvar o novo nome (" + status + ")";
                rresp = data;
                vm.assignment.chechout_name = vm.last_saved_checkout_name;
            });
        }

        function valid_name(name) {
            var chars_ok = _.every(name, function(c) { return _.includes("abcdefghijklmnopqrstuvwxyz0123456789._-", c); });
            var first_ok = !(_.includes(".-", name[0]));

            return chars_ok && first_ok;
        }

        function open_old_activity(key) {
            msgToast.show("Lendo atividade...");
            
            let assignment_fetched = fetch(api_url + '/assignment/' + key, {
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + user_token.token}
            });

            $q.when(assignment_fetched)
            .then(r => r.json())
            .then(function (data) {
                let assignment = new Assignment(data);
                vm.loading = false;
                console.log(assignment.state);

                watch_user();

                if (assignment.type !== 'quiz') { return; }

                // deal with quiz
                let quiz_file = assignment.activity.files.find(f => f.name === 'quiz.json');
                _assert(quiz_file, 'no quiz file found in activity')
                try {
                    vm.quiz = JSON.parse(quiz_file.content);
                    vm.update_quiz_answers(assignment.current_answer);
                } catch (e) {
                    _assert(false, 'quiz.json is not valid json');
                }

                // go full screen
                if (assignment.state === 'open') {
                    fullscreen(document.body);
                }

            })
            .catch(function (err) {
                vm.loading = false;
                console.log('assignment request failed: ' + key)
                alert("ERRO: não foi possível ler detalhes da atividade")
                console.log(err);
                _assert(false, 'problems fetching assignment');
            });

            vm.reload();
        }

        function open_new(assignment, activity_name, unit) {
            msgToast.show("Abrindo nova atividade...");
            console.log(assignment);
            console.log(activity_name);
            console.log(unit);
            console.log("----");
            console.log(`activity_name: ${activity_name}`);
            console.log(`unit: ${unit}`);
            const payload = {
                "activity": activity_name,
                "group": user.current_group,
                "user": user.email,
                "unit": unit
            }
            console.log(payload);
            console.log("API: " + api_url);
            const create_assignment = fetch(api_url + '/assignment', {
                method: 'POST',
                body: JSON.stringify(payload),
                redirect: 'follow',
                headers: {'Authorization': 'Bearer ' + user_token.token}
            });

            $q.when(create_assignment)
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw Error(response.statusText);
            })
            .then(function (data) {
                console.log('assignent criado!');
                console.log(data);
                $state.go('app.assignment', {key:data.key}, {location: 'replace'})
            })
            .catch(function (error) {
                console.log(`Não foi possível abrir atividade ${activity_name}`);
                msgToast.show("Não foi possível abrir a atividade...");
                vm.loading = false;
                vm.assignment.activity = false;
            })
        }

    }

})();
