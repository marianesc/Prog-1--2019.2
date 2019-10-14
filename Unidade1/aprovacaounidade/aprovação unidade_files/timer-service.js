(function(){
    'use strict';

    // register user service in application module tst
    angular.module('tst')
        .service('timer', ['user', '$interval', Timer]);

    //
    // Timer service
    //
    function Timer(user, $interval){
        var self = this;

        var assignment_timer;

        self.start = function() {
            assignment_timer = $interval(function() {
                console.log("tic");
                if (!(user && user.selected)) {
                    console.log("- oops, no user or no selected assignment");
                    return;
                }

                var assignment = user.selected;

                if (!assignment.__open_datetime)
                    assignment.__open_datetime = new Date(assignment.open_datetime)

                if (!assignment.__deadline)
                    assignment.__deadline = new Date(assignment.deadline)

                var now = new Date();

                var time_spent = now - assignment.__open_datetime;
                assignment.delta_string = deltams2string(time_spent);

                var time_remaining = assignment.__deadline - now;
                assignment.remaining_time = deltams2string(time_remaining);

            }, 1000);

          console.log("Starting the timer!");
          assignment_timer.then(success);
        }

        // TODO: in the future, maybe we want to warn the user
        // thar the time is over?
        function success() {
            console.log("done");
        }

        self.stop = function() {
            console.log("Hey... stopping the timer now!");
            $interval.cancel(assignment_timer);
        }

        // start timer
    }

    // how much time this is...
    function deltams2string(milisegundos) {
        var segundos = Math.trunc(milisegundos / 1000)

        var dias = Math.trunc(segundos / (24*60*60));
        segundos -= dias*24*60*60;

        var horas = Math.trunc(segundos / (60*60));
        segundos -= horas*60*60;

        var minutos = Math.trunc(segundos / 60);
        segundos -= minutos*60;
        
        if (dias > 0)
            return dias + " dias, " + horas + " horas";

        if (horas > 0)
            return horas + " horas, " + minutos + " minutos";

        if (minutos > 0)
            return minutos + " minutos, " + segundos + " segundos";

        if (segundos > 0)
            return segundos + " segundos";

        return "tempo esgotado";
    }

})();
