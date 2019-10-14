var gs;

(function(){

    var tst = angular.module('tst');
    tst.service('GroupService', ['$http', '$q', GroupService]);

    function GroupService($http, $q) {
        var service = gs = this;

        service.get_by_id = function get_by_id(key) {

            const fetch_group = fetch(api_url + '/group/' + key + '?add=plan', {
                method: 'GET',
                headers: {'Authorization': 'Bearer ' + user_token.token}
            });

            const promise = $q.when(fetch_group)
            .then(function (response) { return response.json(); })
            .then(function (data) {
                // success
                service.group = new Group(data);
                service.group.units = service.group.plan.units;
                return service.group;
            })
            .catch(function (error) {
                console.error('group request failed ' + key)
                return {error: error, msg: "group request failed"};
            })

            return promise;
        }

        service.get_by_id_deprecated = function get_by_id_deprecated(key) {
            const promise_group = $http({
                method: 'GET',
                url: api_url + '/group/' + key + '?api=v2',
                headers: {'Authorization': 'Bearer ' + user_token.token}
            });

            const promise_status = $http({
                method: 'GET',
                url: api_url + '/group/' + key + '/status',
                headers: {'Authorization': 'Bearer ' + user_token.token}
            });

            const promise = $q.all([promise_group, promise_status])
            .then(function ([group_response, status_response]) {
                // success
                service.group = new Group(group_response.data);
                service.group.students.forEach(s => {
                    s.progress = status_response.data[s.email].progress;
                    s.closed = status_response.data[s.email].closed;
                    s.mode = status_response.data[s.email].mode;
                    s.units = _.map(s.progress.units, (v, k) => {v.unit = k; return v;});
                    s.grade = s.units
                              .filter(u => u.mtp)
                              .map(e => e.mtp)
                              .reduce((s, e) => s + e, 0) / 2;

                    s.top_unit = s.units
                                 .filter(u => u.state === 'unlocked')
                                 .map(u => Number(u.unit))
                                 .reduce((max, e) => e > max ? e : max, 0);
                });
                return service.group;
            }, function (err) {
                // err
                console.log('group request failed ' + key)
                return {error: err, msg: "group request failed"};
            })

            return promise;
        }

        service.update_unit = function (email, top_unit, group_name) {
            const promise = $http({
                method: 'POST',
                url: `${api_url}/group/${group_name}/updateunits?email=${email}&top_unit=${top_unit}`,
                headers: {'Authorization': 'Bearer ' + user_token.token}
            });
            
            promise.then(function (response) {
                console.log(response);    
            }, function (error) {
                console.error('mudança de units deu errado');    
                console.log(error);
            });

            return promise;
        }

        service.update_mode = function (email, mode, group_name) {
            console.log('service.update_mode');
            const promise = $http({
                method: 'POST',
                url: `${api_url}/group/${group_name}/mode?emails=${email}&newmode=${mode || ''}`,
                headers: {'Authorization': 'Bearer ' + user_token.token}
            });
            
            promise.then(function (response) {
                console.log('service.update_mode: success callback');
                console.log('mudança de mode ok');    
                console.log(response);    
            }, function (error) {
                console.log('service.update_mode: fail callback');
                console.error('mudança de mode deu errado');    
                console.log(error);
            });

            return promise;
        }
    }

})();
