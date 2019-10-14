angular.module('tst')
.service('AssignmentService', ['$q', AssignmentService]);

function AssignmentService($q) {
    var service = this;

    service.get_by_id = function get_by_id(key) {
        let url =  api_url + '/assignment/' + key;
        console.log(`requesting assignment: ${url}`);
        var promise = fetch(url, {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + user_token.token}
        })
        .then(process_response)
        .then(assignment_data => { window.ad = assignment_data; return new Assignment(assignment_data); })
        .catch(function (err) {
            console.log('assignment request failed: ' + key)
            console.error(err);
            throw err;
        });

        return $q.when(promise);
    };

    service.create = function create(activity, unit, group) {
        let url =  api_url + '/assignment';
        let promise = fetch(url, {
            method: 'POST',
            headers: {'Authorization': 'Bearer ' + user_token.token},
            body: JSON.stringify({activity, unit, group})
        })
        .then(process_response)
        .catch(function (err) {
            console.log('assignment request failed: ' + activity);
            console.error(err);
            return err;
        })

        return $q.when(promise);
    }

    function process_response(response) {
        if (response.ok) {
            return response.json();
        }
        throw {status:response.status, message: response.statusText};
    }
}
