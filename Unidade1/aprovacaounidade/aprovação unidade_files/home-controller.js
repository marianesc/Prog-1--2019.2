console.log('starting home controller');
angular.module('tst').controller('HomeCtrl', HomeCtrl);

function HomeCtrl(user, GroupService, AssignmentService, msgToast, $mdToast, $q, $mdDialog, $state) {
    console.log('running constructor of HomeCtrl');
    let vm = this;
    window.vm = vm;

    vm.folder = '*';
    vm.types_selected = [];

    initialize();

    function initialize() {
        console.log('running initialize');
        user.load()
        .then(function () {
            if (!user.current_group) {
                $state.go('app.user')
            }
            GroupService.get_by_id(user.current_group).then(function (group) {
                user.group = group;
            });

            let current_cookie = get_cookie();
            if (!user.googappuid && isdigit(current_cookie)) {
                // server pedindo pra apagar cookie
                update_frontend_cookie('RESET');
            }
            else if (user.googappuid && user.googappuid !== current_cookie) {
                // server pedindo pra mudar googappuid
                update_frontend_cookie(user.googappuid || '');
            }
        })
        .catch(function (error) {
            console.error('we had problems loading user and/or group data');
            console.log(error);
        });
    }

    function get_cookie() {
        let cookie_name = 'GOOGAPPUID';
        const cookie = document.cookie.split(";").find(e => e.split("=")[0].trim() === cookie_name);
        return cookie && cookie.split("=")[1];
    }
    window.get_cookie = get_cookie;

    function isdigit(val) { return  /^\d+$/.test(val); }
    function update_frontend_cookie(new_value) {
        // define new cookie
        let cookie;
        if (new_value !== 'RESET') {
            cookie = `GOOGAPPUID=${user.googappuid}`;
        }
        else {
            cookie = "GOOGAPPUID=0; max-age=-1";
        }

        document.cookie = cookie;
        window.location.reload(true);
    }

    function confirm_update_cookie() {
        var toast = $mdToast.simple()
                    .textContent('Nova versão disponível')
                    .action('ATUALIZAR')
                    .highlightAction(true)
                    .hideDelay(0)
                    .highlightClass('md-accent');

        return $mdToast.show(toast);
    }

    vm.open_assignment = function open_assignment(aentry) {
        if (aentry.state == 'new') {
            create_assignment(aentry)
            .then(function (assignment) {
                $state.go('app.assignment', {key:assignment.key})
            });
        } else {
            $state.go('app.assignment', {key:aentry.key})
        }
    }

    function create_assignment(aentry) {
        let activity = aentry.name;
        let unit = aentry.unit;
        let group = user.current_group;
        return AssignmentService.create(activity, unit, group)
               .catch(function (err) {
                   alert('OPS! erro ao criar atividade!');
                   throw err;
               });
    }

    vm.unit_label = function (unit_id) {
        if (!user.group) return unit_id;
        return vm.units().find(u => u.name == unit_id).label;
    }

    vm.is_closed = function is_closed(aentry) {
        return aentry.state === 'closed' || aentry.state === 'canceled';
    }

    vm.units_old = function units() {
        if (!user.group)
            return null;
        return user.group.units;
    }

    vm.units = function units() {
        if (!user.group)
            return null;

        return user.group.units
                .filter(unit => user.assignments.find(e => e.unit === unit.name) || user.whatsnext.find(e => e.unit === unit.name));
    }

    vm.unit = function unit(name) {
        return vm.units().find(e => e.name === name);
    }

    vm.has = function has(list, item) {
        return _.includes(list, item);
    }

    function toggle(clicado) {
        var index = vm.types_selected.indexOf(clicado);
        if (index > -1) {
            vm.types_selected.splice(index, 1);
        } else {
            vm.types_selected.push(clicado);
        }
    }

    vm.toggle_type = function toggle_type(clicado) {
        const state = (function () {
            const lesson = vm.types_selected.includes('lesson') ? '1' : '0';
            const problem = vm.types_selected.includes('problem') ? '1' : '0';

            return lesson + problem;
        }());

        const outro = clicado === 'lesson' ? 'problem' : 'lesson';

        if (state === '00') {
            // clicado para filtrar
            toggle(clicado);
        } else if (state === '01' && clicado === 'problem' || state === '10' && clicado === 'lesson') {
            // clicado pra desmarcar
            toggle(clicado);
        } else if (state === '01' && clicado === 'lesson' || state === '10' && clicado === 'problem') {
            // clicado pra alternar
            toggle(clicado);
            toggle(outro);
        }
    }

    vm.label = function label(name) {
        if (!user.group) return '';
        if (user.challenge) {
            if (name) {
                return name.split('_').map(e => e.charAt(0).toUpperCase() + e.slice(1)).join(" ");
            } else {
                return '?';
            }
        }
        return user.group.plan.activities[name].label;
    }

    vm.type = function type(name) {
        if (!user.group) return '';
        return name in user.group.plan.activities ? user.group.plan.activities[name].type || name : 'problem';
    }

    vm.atype = function type(assignment) {
        if (!user.group) return '';
        let plan_assigned_type;
        if (user.group.plan && user.group.plan.activities && user.group.plan.activities[name]) {
            plan_assigned_type = user.group.plan.activities[name].type;
        }
        return plan_assigned_type || assignment.type;
    }

    vm.listing = function listing() {
        const unit = vm.selected_unit;
        let assignments = user.assignments
        let whatsnext = user.whatsnext;

        const listing = assignments.map(e => e);
        whatsnext.forEach(a => {
            //if (!listing.find(e => e.unit === a.unit && e.name === a.name)) {
                a.label = vm.label(a.name);
                a.type = a.type || vm.type(a.name);
                a.state = 'new';
                a.key = a.key || `${a.unit}!${a.name}`;
                listing.push(a);
            //}
        });

        return listing.filter(a => (!unit || a.unit === unit.name) &&
                                   (vm.types_selected.length === 0 || vm.types_selected.includes(a.type)) &&
                                   (vm.folder === '*' && !a.archived || vm.folder === 'archive' && a.archived))
                      .sort((a1, a2) => vm.reverse_order ? a1.create_datetime >= a2.create_datetime : a2.create_datetime >= a1.create_datetime);
    }

    vm.toggle_unit = function toggle_unit(u) {
        if (vm.selected_unit && vm.selected_unit.name === u.name) {
            delete vm.selected_unit;
        } else {
            vm.selected_unit = {name: u.name};
        }
    }

    vm.toggle_archive = function toggle_archive(assignment) {
        // WARNING: duplicated method from new-assignment-controller.js
        // TODO: move to common service
        if (assignment.state !== 'closed' && assignment.state !== 'canceled') {
            return $q.when(Promise.resolve());
        }
        const archive_url = `${api_url}/assignment/${assignment.key}/archive`;
        const unarchive_url = `${api_url}/assignment/${assignment.key}/unarchive`;
        const promise = fetch(assignment.archived ? unarchive_url : archive_url, {
            method: 'POST',
            headers: {'Authorization': 'Bearer ' + user_token.token}
        });

        return $q.when(promise)
        .then(function (r) {
            assignment.archived = !assignment.archived;
        })
        .catch(function (r) {
            msgToast.show(`Não foi possível ${assignment.archived ? 'des' : ''}arquivar a atividade...`);
        });
    }

    vm.request_new_assignment = function request_new_assignment(ev) {
        if (user.mode) {
            do_request();
            return;
        }

        var confirm = $mdDialog.prompt()
                               .title('De qual unidade?')
                               .placeholder('unidade')
                               .ariaLabel('Unidade')
                               .targetEvent(ev)
                               .ok('Pedir atividade')
                               .cancel('Cancelar');

        $mdDialog.show(confirm).then(function(unit) {
            var units = _.keys(user.groups[user.current_group]['units'])
            unit = unit || units.current_unit;
            if (units.indexOf(unit) < 0) {
                msgToast.show("Unidade inexistente");
                return;
            }
            do_request(unit);
        }, function() {
            console.log("solicitação de assignment cancelada");
        });

        // private functions
        function do_request(unit) {
            vm.waiting_new_assignment = true;
            user.get_new_assignment(unit || undefined).then(function () {
                vm.waiting_new_assignment = false;
                msgToast.show("Atividade liberada com sucesso");
                user.load();
            }, function (msg) {
                vm.waiting_new_assignment = false;
                if (msg === 'too many available assignments') {
                    msgToast.show("tem muitas atividades novas/abertas/adiadas.");
                } else if (msg == "unit is not in the plan") {
                    msgToast.show("Unidade inexistente");
                } else if (msg == "the unit is locked for the user") {
                    msgToast.show("Unidade bloqueada");
                } else if (msg == "no challenge for this mode") {
                    msgToast.show("Não há atividades registradas");
                } else if (msg == "assignee must close previous assignments") {
                    msgToast.show("É necessário concluir as atividades abertas antes");
                } else if (msg == "challenge deadline expired") {
                    msgToast.show("O miniteste já foi encerrado");
                } else if (msg == "user blocked") {
                    msgToast.show("Usuário bloqueado");
                } else if (msg == "activity not found") {
                    msgToast.show("Atividade inexistente no Datastore");
                } else if (msg == "user has already new assignment") {
                    msgToast.show("Usuário já tem novas atividades disponíveis");
                } else if (msg === 'no activity available') {
                    if (!user.mode) {
                        msgToast.show("Não há nenhuma atividade nessa unidade que você não tenha.");
                    } else {
                        msgToast.show("Não há mais atividades disponíveis.");
                    }
                } else {
                    msgToast.show("Não é possível liberar atividades. Contacte o professor.");
                }
            });
        }
    }
}
