import './p1-unit.js';
angular.module('tst').controller('StudentProgressCtrl', StudentProgressCtrl);

function StudentProgressCtrl(user, StudentService, $location, $q) {
    let vm = this;
    window.vm = vm;

    vm.student = null;
    vm.email = $location.url().split('/')[2];
    vm.loading = true;

    const GRAVATAR = "http://www.gravatar.com/";
    Object.defineProperties(vm, {
        gravatar_profile: {get: function () {return vm.student && vm.student.gravatar ? GRAVATAR + vm.student.gravatar.split("/")[4] : "";}}
    });

    function process_response(response) {
        if (response.ok) {
            return response.json();
        }
        throw {status:response.status, message: response.statusText};
    }

    (async function initialize() {
        try {
            vm.user = await user.load();
            vm.student = await StudentService.get_by_id(vm.email);
            let url = api_url + `/user/${vm.email}/progress`;
            let headers = {'Authorization': 'Bearer ' + user_token.token};
            let progress = await fetch(url, {method:'GET', headers})
                                 .then(r => process_response(r));
            vm.progress = progress;
            vm.loading = false;
            return $q.when(progress);
        } catch (err) {
            vm.error = err.status;
            vm.loading = false;
            console.log(err);
        }
    }());

    vm.closed_assignments = function () {
        if (typeof vm.assignment === 'undefined') {
            vm._closed_assignments = vm.student.assignments.reduce((s, a) => s + (a.state === 'closed' ? 1 : 0), 0);
        }
        return  vm._closed_assignments;
    }

    vm.progress_theory = function () {
        if (!vm.progress) return [];
        return vm.progress.units.filter(u => u.type === 'theory').sort((u1, u2) => u1.name < u2.name ? 1 : -1);
    }

    vm.progress_practice = function () {
        if (!vm.progress) return [];
        return vm.progress.units.filter(u => u.type === 'practice').sort((u1, u2) => u1.name < u2.name ? 1 : -1);
    }

    vm.from_now = function (timestamp) {
        var m = moment(timestamp + 'Z');
        return m.fromNow();
    };

    vm.assignment_view_url = function (assignment) {
        if (user.email !== 'daltonserey@gmail.com')
            return assignment.url;
        var iid = assignment.url.split("/")[5]
        return "/#/nas/" + iid
    };

    vm.total_time = function (assignment) {
        var opened_at = moment(assignment.open_datetime + 'Z');
        var closed_at = moment(assignment.close_datetime + 'Z');
        var duration = moment.duration(closed_at - opened_at)
        return duration.humanize(true);
    };
}
