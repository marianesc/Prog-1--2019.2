(function () {
    var mod = angular.module('tstQuiz', []);

    mod.directive('quiz', ['user', quizDirective]);

    mod.directive('newquiz', ['user', '$compile', '$templateCache', newQuiz]);

    mod.directive('umquiz', ['user', '$compile', '$templateCache', umQuiz]);

    function umQuiz(user, $compile, $templateCache) {
        
        short_template = $templateCache.get('partial/quiz-short.html');

        return {
            restrict: 'AE',
            scope: {},
            controller: function ($scope) {
                $scope.resposta = "";
                $scope.dirty = false;
            },
            link: function(scope, element, attributes) {
                var data = element.html(); // alternativa: quizbody = element.html();
                try {
                    data = JSON.parse(data);
                } catch (err) {
                    element.html('<span style="color: red; font-weight: 600;">INVALID QUIZ (data is not JSON)</span>');
                    return;
                }
                scope.question = data['question'];
                scope.answer = data['answer'];
                var body = $compile(short_template)(scope);
                element.replaceWith(body);
            }
        };
    }

    function newQuiz(user, $compile, $templateCache) {
        
        short_template = $templateCache.get('partial/quiz-short.html');

        return {
            restrict: 'AE',
            controllerAs: 'vm',
            controller: function ($scope) {
                $scope.nome = "Dalton";
                $scope.dirty = false;
            },
            compile: function(element, attributes) {
                quizbody = element[0].innerHTML; // alternativa: quizbody = element.html();
                try {
                    var data = JSON.parse(quizbody);
                } catch (err) {
                    console.log(err);
                    element.html('<span style="color: red; font-weight: 600;">INVALID QUIZ (body is not JSON)</span>');
                    return;
                }
                var body = short_template;
                element.html(body);
                return function (scope, element) {
                    scope.param = attributes['param'];
                    scope.answer = data['answer'];
                    e = angular.element();
                    scope.question = data['question'];
                }
            }
        };
    }

    function quizDirective(user) {
        return {
            restrict: 'EA',
            transclude: true,
            template: function(elem, attrs) {

                // if (user.selected.state == 'open')
                //    return "<span><!-- hidden quiz --></span>";

                var tpl_short = 
                "<form oncopy=\"return false;\" ng-submit=''>" +
                "    <div class='md-whiteframe-z1 quizbox' layout='column' layout='center center'>                                                                  " + 
                "       {{app.user.selected.quizzes['<%= quiz_id %>'].text}}                                                                                       " +
                "       <pre ng-if='app.user.selected.quizzes[\"<%= quiz_id %>\"].code' class='code'>{{app.user.selected.quizzes['<%= quiz_id %>'].code}}</pre>   " +
                "       <md-input-container>                                                                                                                        " + 
                "           <input                                                                                                                                  " +
                "               ng-keyup='$event.keyCode != 13 && ac.reset_feedback(\"<%= quiz_id %>\", $event)'" +
                "               ng-disabled='{{app.user.selected.state == \"closed\"                                                                               " +
                "                           || app.user.selected.state == \"archived\"}}'                                                                          " +
                "               ng-model='app.user.selected.quizzes[\"<%= quiz_id %>\"].answer'                                                                    " +
                "               ng-change='ac.evaluate_answer(\"<%= quiz_id %>\", \"{{ac.escape(app.user.selected.quizzes.<%= quiz_id %>.answer)}}\")'             " +
                "               ng-model-options=\"{ updateOn: 'default blur', debounce: {'default': 1500, 'blur': 0} }\"                                           " +
                "               type='text'></input>                                                                                                                " +
                "       </md-input-container>                                                                                                                       " +
                "       <small ng-if='app.user.selected.quizzes[\"<%= quiz_id %>\"].is_correct == true' style=\"color: lightgray;\">Resposta correta</small>       " +
                "       <small ng-if='app.user.selected.quizzes[\"<%= quiz_id %>\"].is_correct == false' style=\"color: red;\">Resposta errada</small>             " +
                "    </div>                                                                                                                                         " +
                "</form>"

                var tpl_program = 
                "    <div ng-if='app.user.selected.quizzes[\"__program\"]' class='md-whiteframe-z1 quizbox' layout='column' layout='center center'>                " + 
                "       <!--h3 style='margin-top: 0;'>{{app.user.selected.quizzes['<%= quiz_id %>'].text}}</h3 -->                                                 " +
                "       <h1 style='margin-top: 0; margin-bottom: 5px;'>Chave de Upload/Download: {{app.user.selected.quizzes[\"<%= quiz_id %>\"].key}}</h1>        " +
                "       <div ng-if='app.user.selected.quizzes[\"<%= quiz_id %>\"].answer'>                                                                         " +
                "         <h2>Seu programa</h2>                                                                                                                     " +
                "         <pre style='margin-top: 5px;' ng-show='app.user.selected.quizzes[\"<%= quiz_id %>\"].answer' class='code'>{{app.user.selected.quizzes['<%= quiz_id %>'].answer}}</pre> " +
                "       </div>                                                                                                                                      " +
                "       <div class='fff' ng-if='app.user.selected.quizzes[\"<%= quiz_id %>\"].feedback'>                                                           " +
                "         <h2>Feedback</h2>                                                                                                                         " +
                "         <p class='feedback'>{{app.user.selected.quizzes['<%= quiz_id %>'].feedback}}</p>                                                         " +
                "       </div>                                                                                                                                      " +
                "       <small ng-if='app.user.selected.quizzes[\"<%= quiz_id %>\"].is_correct == true' style=\"color: lightgray;\"><p style='margin-top: 10px; margin-bottom: 0px;'>Seu programa passa nos testes</p></small>       " +
                "       <small ng-if='app.user.selected.quizzes[\"<%= quiz_id %>\"].is_correct == false' style=\"color: red;\"><p style='margin-top: 10px; margin-bottom: 0px;'>Seu programa não passa nos testes</p></small>       " +
                "    </div>                                                                                                                                         "

                var a = user.selected;
                var name = attrs.name;

                // base template (error)
                var template = "<h3 style='color: red;'>QUIZ Problem</h3>"
                
                if (name == "__program")
                    //template = tpl_program
                    return "<span><!-- program quiz --></span>";

                // do we have data to render this quiz?
                else if (!a.quizzes || !a.quizzes[name]) {
                    template = "<h3 style='color: red;'>There's no data to render quiz '<%= quiz_id %>'.</h3>"
                }

                // it must be a short (default) quiz
                else template = tpl_short;

                return _.template(template)({quiz_id: name})
               
            }
        };
    }
})()
