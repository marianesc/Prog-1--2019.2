(function(){
    'use strict';

    // register user service in tst app
    angular.module('tst').service('msgToast', ['$mdToast', '$q', MsgToast]);

    function MsgToast($mdToast, $q) {
        var msgToast = this;
        var promise;
        var toast;
    
        msgToast.show = function(msg) {
            if (!msg) {
                return;
            }
            var toast = $mdToast.simple()
                        .textContent(msg)
                        .hideDelay(2000);
            if (_.isUndefined(promise)) {
                promise = $mdToast.show(toast)
                promise.finally(function () {
                    promise = undefined;
                });        
            }
        }
    }
})();
