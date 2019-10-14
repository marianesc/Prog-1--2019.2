angular.module('tst')
.controller('AppController', AppController);

function AppController(user, msgToast, $window, $mdDialog,$log, $sce, $state, $timeout, $scope, $http) {
    var app = this;
    window.app = app;

    (function initialize() {
        console.log('app-controller versão 2');
        app.gravatar = gravatar;
        app.user = user;
        app.frontend = FRONTEND;
        user.load()
        .then(function () {
            app.backend = (user.api || '').split('.')[0];
        });
    }());

    app.remaining_seconds = function (datetime) {
        return moment(datetime).diff(new Date()) / 1000;
    }

    app.about = function about() {
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .clickOutsideToClose(true)
            .title('Versões frontend / backend')
            .textContent(`${app.frontend} / ${app.backend}`)
            .ariaLabel('About TST')
            .ok('Ok')
        );
    }
}
