angular.module('tst')
.service('StudentService', StudentService);

function StudentService($http, $q) {
    let service = this;
    window.sservice = service;

    // Service API
    service.get_by_id = function get_by_id(email) {
        var promise1 = $http({
            method: 'GET',
            url: api_url + '/user/' + email,
            cache: true,
            headers: {'Authorization': 'Bearer ' + user_token.token}
        });
        
        var promise2 = $http({
            method: 'GET',
            url: api_url + '/user/' + email + '/progress',
            cache: true,
            headers: {'Authorization': 'Bearer ' + user_token.token}
        });
        
        var promise = $q.all([promise1, promise2])
        .then(function (responses) {
            console.log('both user and user progress here...')
            var student = new Student(responses[0].data);
            student.new_progress = responses[1].data;
            return student;
        });

        return promise;
    };
}
