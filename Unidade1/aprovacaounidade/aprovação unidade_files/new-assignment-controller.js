angular.module('tst')
.controller('NewAssignmentCtrl', NewAssignmentCtrl);

const VALID_EXTENSIONS = ['js', 'py', 'py2', 'py3', 'c', 'java'];
const MAX_FILENAME_LENGTH = 30;

function NewAssignmentCtrl(user, AssignmentService, msgToast, $window, $timeout, $location, $state, $mdDialog, $mdMedia, $q) {
    let vm = this;
    window.vm = vm;

    vm.fabdirection = 'down';
    vm.fabmode = 'md-scale';
    vm.fabopen = false;
    (function initialize() {
        let url = $location.url().split('/');
        vm.assignment_key = url[2];

        vm.loading = true; // ok
        let promise_user = user.load();
        let promise_assignment = AssignmentService.get_by_id(vm.assignment_key);

        let promises = $q.all([promise_user, promise_assignment])
                         .then(([user, assignment]) => {
                             vm.assignment = assignment;
                             vm.loading = false;
                             watch_user();
                             if (assignment.type === 'quiz' && assignment.state === 'open') {
                                 render_quiz();
                                 render_current_answer();
                                 if (assignment.mode) {
                                     fullscreen(document.body);
                                 }
                             }
                         })
                         .catch(error => {
                             vm.error = error;
                             console.log(error);
                         });

        return $q.when(promises);
    }());

    vm.discard_changes = function discard_changes() {
        render_current_answer();
    }

    vm.checkout_name = function checkout_name() {
        if (!vm.user_is_owner()) {
            return vm.assignment_key;
        }

        if (vm.assignment.state !== 'open') {
            return '';
        }

        // user is owner && assignment is open
        let aentry = user.assignments.find(e => e.key === vm.assignment_key);
        if (aentry.checkout_name) {
            return aentry.checkout_name;
        };

        return '...';
    }

    vm.answer_changed = function answer_changed($quiz) {
        if (!vm.assignment.current_answer) {
            vm.assignment.current_answer = {};
        }
        $timeout(function () {
            vm.dirty = true;
            $quiz.feedback = undefined;
        });
    };

    vm.enable_close_assignment = function enable_close_assignment() {
        if (vm.assignment.state !== 'open' || !vm.user_is_owner()) {
            return false;
        }

        else if (vm.assignment.type === 'lesson') {
            return true;
        }

        else if (vm.assignment.type ===  'problem') {
            return vm.user_is_owner() && passes_tests(vm.assignment.current_answer);
        }

        else if (vm.assignment.type ===  'quiz') {
            return true;
        }

        _assert(false, 'unforeseen condition');
    };

    vm.is_synced = function is_synced() {
        return !vm.dirty;
    };

    function is_empty(obj) {
        return Object.entries(obj).length === 0 && obj.constructor === Object;
    }

    vm.enable_cancel_assignment = function enable_cancel_assignment() {
        // has an answer
        // AND test results
        // AND cannot not be enabled to close
        return Boolean(vm.assignment.current_answer) && Boolean(vm.assignment.current_answer.__results) && !vm.enable_close_assignment();
    }

    function is_posix_portable(filename) {
        return !!(filename.match(/^[A-Za-z0-9._-]*$/g));
    }

    function check_filename(filename) {
        let problems = [];
        if (filename.length > MAX_FILENAME_LENGTH) {
            problems.push("too long");
        }
        if (!is_posix_portable(filename)) {
            problems.push("non posix");
        }

        let tokens = filename.split('.');
        if (tokens.length > 2) {
            problems.push("too many dots")
        }

        if (tokens.length < 1) {
            problems.push("no extension")
        }

        if (!VALID_EXTENSIONS.includes(tokens[tokens.length - 1])) {
            problems.push("invalid extension")
        }
        return problems;
    }

    vm.has_valid_filename = function has_valid_filename() {
        if (!vm.assignment.current_answer) return false;
        let problems = check_filename(vm.assignment.current_answer.__filename);
        return problems.length == 0;
    }

    vm.must_test = function must_test() {
        // has an answer
        // AND no test results
        return Boolean(vm.assignment.current_answer && !vm.assignment.current_answer.__results);
    }

    vm.is_worker_available = function is_worker_available() {
        return true;
    };

    vm.user_is_owner = function user_is_owner() {
        return vm.assignment.user === user.email;
    };

    // ok (trazido agora de assignment-controller.js)
    vm.new_close_assignment = function () {
        let answer_saved;
        if (vm.assignment.type === 'quiz') {
            answer_saved = commit_quiz_answer_if_any();
        } else {
            answer_saved = Promise.resolve();
        }

        answer_saved
        .then(function () {
            close_assignment_dialog();
        })
    };

    vm.commit_answer = function commit_answer() {
        vm.committing = true;
        commit_quiz_answer_if_any()
        .then(function (updated_answer) {
            vm.committing = false;
        })
        .catch(function (err) {
            alert('Falha ao enviar resposta ao servidor.');
        });

    };

    vm.toggle_archive = function toggle_archive(assignment) {
        // WARNING: duplicated method from home-controller.js
        // TODO: move to common service
        const archive_url = `${api_url}/assignment/${assignment.iid}/archive`;
        const unarchive_url = `${api_url}/assignment/${assignment.iid}/unarchive`;

        const url = assignment.archived ? unarchive_url : archive_url;
        const change = fetch(url, {
            method: 'POST',
            headers: {'Authorization': 'Bearer ' + user_token.token}
        });

        return $q.when(change)
                 .then(function (r) {
                     msgToast.show(`Atividade ${assignment.archived ? 'des' : ''}arquivada.`);
                     assignment.archived = !assignment.archived;
                 })
                 .catch(function (r) {
                     msgToast.show(`NÃ£o foi possÃ­vel ${assignment.archived ? 'des' : ''}arquivar a atividade...`);
                 });
    }

    vm.send_to_worker = function send_to_worker() {
        function answer_sent_to_worker() {
            return vm.assignment.current_answer && vm.assignment.current_answer.__results || vm.worker_req_status === 'waiting';
        }

        _assert(['problem', 'quiz'].includes(vm.assignment.type), 'assignment is not problem or quiz')
        _assert(!(vm.assignment.type === 'problem') || !answer_sent_to_worker(), 'answer already sent to the worker')

        commit_quiz_answer_if_any()
        .then(function (updated_answer) {
            if (typeof(vm.assignment.current_answer) === 'undefined') {
                vm.assignment.current_answer = {}
            };
            Object.assign(vm.assignment.current_answer, updated_answer);
            let url = assignment_url() + '/validation';
            let headers = {'Authorization': 'Bearer ' + user_token.token};
            let validation_requested = fetch(url, {method:'POST', headers});
            msgToast.show('Enviando resposta ao worker');
            $q.when(validation_requested)
            .then(_ => { poll_for_results(1); });
        })
        .catch(function (err) {
            console.error("Ops! problems when sending answer to worker!");
            console.log(err);
        });
    };

    vm.num_fails = function num_fails(answer) {
        let fails = vm.fails(answer);
        if (fails === undefined) return undefined;

        return fails.length;
    };

    vm.fails = function fails(answer) {
        if (typeof(answer.__results) === 'undefined') return undefined;
        if (typeof(answer.__results.summary) === 'undefined') return undefined;
        let summary = answer.__results.summary;

        return summary.split('').reduce((fails, c) => fails + (c !== '.' ? c : ''), '');
    };

    function render_quiz() {
        let quiz_file = vm.assignment.activity.files.find(f => f.name === 'quiz.json');
        _assert(quiz_file, 'no quiz file found in activity')
        try {
            vm.quiz = JSON.parse(quiz_file.content);
        } catch (err) {
            vm.error = err;
            _assert(false, 'quiz.json is not valid json');
        }
    }

    function reload_assignment() {
        let promise_assignment = AssignmentService.get_by_id(vm.assignment_key);
        vm.message = 'atualizando...';
        return $q.when(promise_assignment)
        .then(assignment => {
            vm.assignment = assignment;
            delete vm.message;
        })
        .catch(err => {
            //vm.loading = false;
            vm.error = {"message": "Erro ao reler a atividade"};
            console.log(err);
        });
    }

    function fullscreen(element) {
        if (localStorage.getItem('fullscreen') === "no") return;

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


    function watch_user() {
        angular.element($window).on('blur', function on_blur() {
            if (vm.assignment && vm.assignment.type === 'quiz') {
                cancel_quiz('blur');
            }
        });

        angular.element($window).on('beforeunload', function on_beforeunload() {
            if (vm.assignment.type === 'quiz') {
                cancel_quiz('beforeunload');
            }
            e.returnValue = null;
        });

        angular.element($window).on('focus', function on_focus() {
            if (vm.assignment.type === 'quiz') {
                _assert(['closed', 'canceled'].includes(vm.assignment.state), 'quiz should be closed');
            }

            else if (vm.assignment.type === 'lesson') {
                return;
            }

            else if (vm.assignment.type === 'problem') {
                vm.message = 'atualizando...';
                console.log('antes...' + vm.message);
                $q.when(reload_assignment())
                .then(function () {
                    delete vm.message;
                    console.log('depois...' + vm.message);
                });
                $q.when($q.resolve());
            }
        });
    }

    function quiz_answers() {
        let $quizzes = document.querySelectorAll("qz-short");
        let answers = {};
        $quizzes.forEach($q => {
            answers[$q.id.slice(2)] = $q.value;
        });
        return answers;
    }

    function commit_quiz_answer_if_any(options={auto: false}) {
        if (vm.assignment.type !== 'quiz' || !vm.dirty) {
            return $q.when(Promise.resolve());
        }

        let answers = quiz_answers();
        if (options.auto === true) {
            answers['_auto'] = true;
        }
        let content = JSON.stringify(answers) + '\n';
        let checksum = sha1(content);
        let promise = fetch(api_url + "/" + vm.assignment_key + '/answers', {
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
        .then(r => r.json())
        .then(_ => {
            delete vm.dirty;
            return _;
        });

        return $q.when(promise);
    }

    function passes_tests(answer) {
        if (typeof answer === 'undefined') return false;
        if (typeof answer.__results  === 'undefined') return false;
        if (typeof answer.__results.summary  === 'undefined') return false;

        let summary = answer.__results.summary;

        return summary.split('').every(c => c === '.');
    }

    function assignment_url() {
        return `${api_url}/assignment/${vm.assignment_key}`;
    }

    function render_current_answer() {
        if (!vm.assignment.current_answer) return;

        _assert(vm.quiz, 'no vm.quiz');
        _assert(vm.assignment.current_answer['__filename'] === 'answers.qz', 'no "answers.qz" file in answer');

        let data = vm.assignment.current_answer;

        let answers = JSON.parse(data['__code']);

        vm.quiz.quizzes.forEach((quiz, i) => {
            quiz.answer = answers[quiz.id];
            if (data.__results) {
                quiz._result = data.__results.summary[i];
            }
        });
    }

    function poll_for_results(count=0) {
        if (count == 12) {
            msgToast.show('Worker parece estar offline');
            vm.worker_req_status = 'offline';
            return;
        }

        vm.worker_req_status = 'waiting';
        let url = assignment_url() + '/validation';
        let headers = {'Authorization': 'Bearer ' + user_token.token};
        let worker_results = fetch(url, {method:'GET', headers});

        $q.when(worker_results)
        .then(r => r.json())
        .then(updated_results => {
            if (updated_results.__results) {
                msgToast.show('Resultados do worker recebidos');
                vm.worker_req_status = 'received';
                Object.assign(vm.assignment.current_answer, updated_results);
                if (vm.assignment.type === 'quiz') {
                    render_current_answer();
                }
            } else {
                console.log('waiting 3s...');
                $timeout(_ => {poll_for_results(count + 1)}, 3000);
            }
        })
        .catch(function (err) {
            console.log(err);
            return err;
        })
    }

    function close_assignment_dialog(ev) {
        let customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        let useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && customFullscreen;
        $mdDialog.show({
            controllerAs: 'dialog',
            controller: function(user, $scope, $mdDialog) {
                var dialog = this;
                dialog.vm = vm;
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.answer = function(answer) {
                    $mdDialog.hide(answer);
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
            },
            templateUrl: 'partial/close_dialog.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
        }).then(function (newstate) {
            // assert newstate in ['delayed', 'closed']
            console.log('patching assignment state to "' + newstate + '"');
            user.assignment_change_state(vm.assignment, newstate)
            .then(function () {
                vm.assignment.state = newstate;
                $state.go('app.home')
            }, function (response) {
                alert("ERRO ao mudar estado de atividade: " + response.data.messages[0]);
            });
        }, function () {
            // cancelled
            console.log('concluir atividade cancelada');
        });
    }
}
