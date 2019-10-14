(function(){

    var tst = angular.module('tst');
    tst.controller('StudentsController', ['$http', '$scope', StudentsController]);

    function StudentsController($http, $scope) {
        $scope.data = {};

        console.log("Students controller inicializado com $http")

        $http.get('http://localhost:8000')
        .then(function(results) {
            $scope.data['results'] = results;
        })

    }

})();
