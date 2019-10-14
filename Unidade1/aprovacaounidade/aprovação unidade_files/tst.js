// to DISABLE ngAria warnings
console.realWarn = console.warn;
console.warn = function (message) {
    if (message.indexOf("ARIA") == -1) {
        console.realWarn.apply(console, arguments);
    }
};

let service = '';
let host = window.location.hostname;
if (host.match(/\./g).length == 3) {
    const parts = host.split(".");
    service = parts[0] + '.';
    host = `${parts[1]}.${parts[2]}.${parts[3]}`;
}
var FRONTEND = "alpha";
var BACKEND = "alpha";
let api_url = `http://${BACKEND}.api.tst-online.appspot.com`;

var gravatar = (function() {
    var gravatars = {};

    function get_gravatar(email, size) {
        console.log(email);
        var size = size || 80;
        var hexcase=0;
        function hex_md5(a){return rstr2hex(rstr_md5(str2rstr_utf8(a)))}function hex_hmac_md5(a,b){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a),str2rstr_utf8(b)))}function md5_vm_test(){return hex_md5("abc").toLowerCase()=="900150983cd24fb0d6963f7d28e17f72"}function rstr_md5(a){return binl2rstr(binl_md5(rstr2binl(a),a.length*8))}function rstr_hmac_md5(c,f){var e=rstr2binl(c);if(e.length>16){e=binl_md5(e,c.length*8)}var a=Array(16),d=Array(16);for(var b=0;b<16;b++){a[b]=e[b]^909522486;d[b]=e[b]^1549556828}var g=binl_md5(a.concat(rstr2binl(f)),512+f.length*8);return binl2rstr(binl_md5(d.concat(g),512+128))}function rstr2hex(c){try{hexcase}catch(g){hexcase=0}var f=hexcase?"0123456789ABCDEF":"0123456789abcdef";var b="";var a;for(var d=0;d<c.length;d++){a=c.charCodeAt(d);b+=f.charAt((a>>>4)&15)+f.charAt(a&15)}return b}function str2rstr_utf8(c){var b="";var d=-1;var a,e;while(++d<c.length){a=c.charCodeAt(d);e=d+1<c.length?c.charCodeAt(d+1):0;if(55296<=a&&a<=56319&&56320<=e&&e<=57343){a=65536+((a&1023)<<10)+(e&1023);d++}if(a<=127){b+=String.fromCharCode(a)}else{if(a<=2047){b+=String.fromCharCode(192|((a>>>6)&31),128|(a&63))}else{if(a<=65535){b+=String.fromCharCode(224|((a>>>12)&15),128|((a>>>6)&63),128|(a&63))}else{if(a<=2097151){b+=String.fromCharCode(240|((a>>>18)&7),128|((a>>>12)&63),128|((a>>>6)&63),128|(a&63))}}}}}return b}function rstr2binl(b){var a=Array(b.length>>2);for(var c=0;c<a.length;c++){a[c]=0}for(var c=0;c<b.length*8;c+=8){a[c>>5]|=(b.charCodeAt(c/8)&255)<<(c%32)}return a}function binl2rstr(b){var a="";for(var c=0;c<b.length*32;c+=8){a+=String.fromCharCode((b[c>>5]>>>(c%32))&255)}return a}function binl_md5(p,k){p[k>>5]|=128<<((k)%32);p[(((k+64)>>>9)<<4)+14]=k;var o=1732584193;var n=-271733879;var m=-1732584194;var l=271733878;for(var g=0;g<p.length;g+=16){var j=o;var h=n;var f=m;var e=l;o=md5_ff(o,n,m,l,p[g+0],7,-680876936);l=md5_ff(l,o,n,m,p[g+1],12,-389564586);m=md5_ff(m,l,o,n,p[g+2],17,606105819);n=md5_ff(n,m,l,o,p[g+3],22,-1044525330);o=md5_ff(o,n,m,l,p[g+4],7,-176418897);l=md5_ff(l,o,n,m,p[g+5],12,1200080426);m=md5_ff(m,l,o,n,p[g+6],17,-1473231341);n=md5_ff(n,m,l,o,p[g+7],22,-45705983);o=md5_ff(o,n,m,l,p[g+8],7,1770035416);l=md5_ff(l,o,n,m,p[g+9],12,-1958414417);m=md5_ff(m,l,o,n,p[g+10],17,-42063);n=md5_ff(n,m,l,o,p[g+11],22,-1990404162);o=md5_ff(o,n,m,l,p[g+12],7,1804603682);l=md5_ff(l,o,n,m,p[g+13],12,-40341101);m=md5_ff(m,l,o,n,p[g+14],17,-1502002290);n=md5_ff(n,m,l,o,p[g+15],22,1236535329);o=md5_gg(o,n,m,l,p[g+1],5,-165796510);l=md5_gg(l,o,n,m,p[g+6],9,-1069501632);m=md5_gg(m,l,o,n,p[g+11],14,643717713);n=md5_gg(n,m,l,o,p[g+0],20,-373897302);o=md5_gg(o,n,m,l,p[g+5],5,-701558691);l=md5_gg(l,o,n,m,p[g+10],9,38016083);m=md5_gg(m,l,o,n,p[g+15],14,-660478335);n=md5_gg(n,m,l,o,p[g+4],20,-405537848);o=md5_gg(o,n,m,l,p[g+9],5,568446438);l=md5_gg(l,o,n,m,p[g+14],9,-1019803690);m=md5_gg(m,l,o,n,p[g+3],14,-187363961);n=md5_gg(n,m,l,o,p[g+8],20,1163531501);o=md5_gg(o,n,m,l,p[g+13],5,-1444681467);l=md5_gg(l,o,n,m,p[g+2],9,-51403784);m=md5_gg(m,l,o,n,p[g+7],14,1735328473);n=md5_gg(n,m,l,o,p[g+12],20,-1926607734);o=md5_hh(o,n,m,l,p[g+5],4,-378558);l=md5_hh(l,o,n,m,p[g+8],11,-2022574463);m=md5_hh(m,l,o,n,p[g+11],16,1839030562);n=md5_hh(n,m,l,o,p[g+14],23,-35309556);o=md5_hh(o,n,m,l,p[g+1],4,-1530992060);l=md5_hh(l,o,n,m,p[g+4],11,1272893353);m=md5_hh(m,l,o,n,p[g+7],16,-155497632);n=md5_hh(n,m,l,o,p[g+10],23,-1094730640);o=md5_hh(o,n,m,l,p[g+13],4,681279174);l=md5_hh(l,o,n,m,p[g+0],11,-358537222);m=md5_hh(m,l,o,n,p[g+3],16,-722521979);n=md5_hh(n,m,l,o,p[g+6],23,76029189);o=md5_hh(o,n,m,l,p[g+9],4,-640364487);l=md5_hh(l,o,n,m,p[g+12],11,-421815835);m=md5_hh(m,l,o,n,p[g+15],16,530742520);n=md5_hh(n,m,l,o,p[g+2],23,-995338651);o=md5_ii(o,n,m,l,p[g+0],6,-198630844);l=md5_ii(l,o,n,m,p[g+7],10,1126891415);m=md5_ii(m,l,o,n,p[g+14],15,-1416354905);n=md5_ii(n,m,l,o,p[g+5],21,-57434055);o=md5_ii(o,n,m,l,p[g+12],6,1700485571);l=md5_ii(l,o,n,m,p[g+3],10,-1894986606);m=md5_ii(m,l,o,n,p[g+10],15,-1051523);n=md5_ii(n,m,l,o,p[g+1],21,-2054922799);o=md5_ii(o,n,m,l,p[g+8],6,1873313359);l=md5_ii(l,o,n,m,p[g+15],10,-30611744);m=md5_ii(m,l,o,n,p[g+6],15,-1560198380);n=md5_ii(n,m,l,o,p[g+13],21,1309151649);o=md5_ii(o,n,m,l,p[g+4],6,-145523070);l=md5_ii(l,o,n,m,p[g+11],10,-1120210379);m=md5_ii(m,l,o,n,p[g+2],15,718787259);n=md5_ii(n,m,l,o,p[g+9],21,-343485551);o=safe_add(o,j);n=safe_add(n,h);m=safe_add(m,f);l=safe_add(l,e)}return Array(o,n,m,l)}function md5_cmn(h,e,d,c,g,f){return safe_add(bit_rol(safe_add(safe_add(e,h),safe_add(c,f)),g),d)}function md5_ff(g,f,k,j,e,i,h){return md5_cmn((f&k)|((~f)&j),g,f,e,i,h)}function md5_gg(g,f,k,j,e,i,h){return md5_cmn((f&j)|(k&(~j)),g,f,e,i,h)}function md5_hh(g,f,k,j,e,i,h){return md5_cmn(f^k^j,g,f,e,i,h)}function md5_ii(g,f,k,j,e,i,h){return md5_cmn(k^(f|(~j)),g,f,e,i,h)}function safe_add(a,d){var c=(a&65535)+(d&65535);var b=(a>>16)+(d>>16)+(c>>16);return(b<<16)|(c&65535)}function bit_rol(a,b){return(a<<b)|(a>>>(32-b))};
        return 'http://www.gravatar.com/avatar/' + hex_md5(email) + '.jpg?s=' + size;
    }

    return function (email, size) {
        var g = gravatars[email + ':' + size]
        if (typeof g === 'undefined') {
            g = get_gravatar(email, size) 
            gravatars[email + ':' + size] = g;
        }
        return g;
    }
})()

moment.locale('pt-br');
function momentDiff(m0, m1) {
    if (typeof m1 === 'undefined') {
        m1 = moment();
    }
    function format(num) { if (num < 10) {return '0' + num} else {return '' + num} }
    
    var d = moment.duration(m0 - m1);
    var rep = "";
    if (d.asDays() >= 1) {
        rep += d.days() + " ";
    }
    rep += format(d.hours()) + ":";
    rep += format(d.minutes()) + ":";
    rep += format(d.seconds());
    return rep;
}

function clock(timestamp, look, seconds) {
    const time = new Date(timestamp);
    const difference = time - new Date();
    if (difference <= 0) return '00:00:00';

    const dur = moment.duration(difference, 'milliseconds');
    let rep;

    if (look === 'fromNow') {
        return moment(time).fromNow();
    }
    else if (look === 'countdown') {
        return String(dur.hours()).padStart(2, "0")
              + ":" + String(dur.minutes()).padStart(2,"0")
              + ":" + String(dur.seconds()).padStart(2, "0");
    }

    // look === 'mix' || !look
    if (dur < 1000 * seconds || look === 'mix') {
        return 'em ' + String(dur.hours()).padStart(2, "0")
        + ":" + String(dur.minutes()).padStart(2,"0")
        + ":" + String(dur.seconds()).padStart(2, "0");
    } else {
        return moment(time).fromNow();
    }
}

function time_to_challenge_start() {
    const now = new Date();
    const start = new Date(app.user.challenge.start_datetime);
    if (now >= start) {
        return '00:00:00';
    } else if (start - now < 1000 * 60 *2) {
        return clock(app.user.challenge.start_datetime, 'countdown');
    }
    return moment(start).fromNow();
}



function getRemainingDateTimeStringTST(dt) {
    if (typeof dt ===  undefined) return undefined;
    if (typeof dt === 'string')
        dt = new Date(dt);
    if (!dt) return undefined;

    var remaining = parseInt((dt.getTime() - (new Date().getTime()) + serverDelta) / 1000);
    
    // tempo restante negativo: TIME OVER ('-')
    if (remaining < 0) {
        return "-";
    }

    // abaixo de 60min = 1 * 60 * 60 segundos
    if (remaining < 1 * 60 * 60) {
        var minutes = Math.floor(remaining/60);
        var seconds = Math.floor(remaining - 60*minutes);
        return "00:" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10? "0" + seconds : seconds);
    }

    // abaixo de 24h = 24 * 60 * 60 segundos
    if (remaining < 24 * 60 * 60) {
        var hours = Math.floor(remaining/60/60);
        var minutes = Math.floor((remaining - 60*60*hours)/60);
        var seconds = Math.floor(remaining - 60*minutes - 60*60*hours);
        return (hours < 10? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10? "0" + seconds : seconds);
    }

    // abaixo de uma semana = 7 * 24 * 60 * 60 segundos
    if (remaining >= 24 * 60 * 60) {
        var dias = Math.floor(remaining/60/60/24);
        var hours = Math.floor((remaining - 60*60*24*dias)/60/60);
        var minutes = Math.floor((remaining - 60*60*hours)/60);
        var seconds = Math.floor(remaining - 60*minutes - 60*60*hours);
        return dias + " dias e " + hours + " horas";
    }
}

function _assert(condition, message) {
    if (!condition) {
        throw new Error('Assertion failed: ' + message);
    }
}

// TST (AngularJS Code)
(function () {
    var tst = angular.module('tst', ['tstQuiz', 'ui.router','ngMaterial', 'ngAnimate']);

    tst.run(function ($templateCache, $templateRequest) {
        //$templateCache.put("partial/quiz-short.html", '<h1>template de short quiz</h1>');
        $templateRequest("partial/quiz-short.html");
    });

    tst.config(function config($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider, $locationProvider) {

        // configura urls com # e não comn #!
        $locationProvider.hashPrefix('');

        // configuração geral
        $urlRouterProvider.otherwise('/');
        $urlRouterProvider.when('', '/');

        $mdIconProvider.fontSet('md', 'material-icons');
        
        // estados do TST
        $stateProvider

            // app (abstract root state)
            .state("app", {
                abstract: true,
                views: {
                  'header@': {templateUrl: 'partial/header.html'},
                  'menu@': {
                        templateUrl: 'partial/menu.html',
                        controller: 'MenuCtrl as vm'
                  },
                  'main@': {templateUrl: 'partial/empty.html'}
                }
            })

            // home
            .state("app.home", {
                url: '/',
                views: {
                    'main@': {
                        templateUrl: 'partial/home.html',
                        controller: 'HomeCtrl as vm'
                    }
                }
            })

            // user
            .state("app.user", {
                url: '/user',
                views: {
                    'main@': {
                        templateUrl: 'partial/user.html',
                        controller: 'UserCtrl as vm'
                    }
                }
            })

            // other user
            .state("app.otheruser", {
                url: '/u/{email}',
                views: {
                    'main@': {
                        templateUrl: 'partial/other-user.html',
                        controller: 'OtherUserCtrl as vm'
                    }
                }
            })

            // assignment
            .state("app.old_assignment", {
                url: '/oas/{key}',
                views: {
                    'main@': {
                        templateUrl: 'partial/old-assignment-contents.html',
                        controller: 'OldAssignmentCtrl as vm'
                    }
                }
            })

            // assignment
            .state("app.assignment", {
                url: '/as/{key}',
                views: {
                    'main@': {
                        templateUrl: 'partial/new-assignment-contents.html',
                        controller: 'NewAssignmentCtrl as vm'
                    }
                }
            })

            // assignment answer
            .state("app.assignment_answer", {
                url: '/as/{key}/{answer}',
                views: {
                    'main@': {
                        templateUrl: 'partial/new-assignment-contents.html',
                        controller: 'NewAssignmentCtrl as vm'
                    }
                }
            })

            // challenge
            .state("app.challenge", {
                url: '/ch/{mode}',
                views: {
                    'main@': {
                        templateUrl: 'partial/challenge-contents.html',
                        controller: 'ChallengeCtrl as vm'
                    }
                }
            })

            // challenge
            .state("app.ranking", {
                url: '/r/{mode}',
                views: {
                    'main@': {
                        templateUrl: 'partial/challenge-ranking.html',
                        controller: 'ChallengeRankingCtrl as vm'
                    }
                }
            })

            // browse extra activities
            .state("app.browse", {
                url: '/br',
                views: {
                    'main@': {
                        templateUrl: 'partial/browse.html',
                        controller: 'BrowseCtrl as vm'
                    }
                }
            })

            // activity
            .state("app.activity", {
                url: '/ac/{name}',
                views: {
                    'main@': {
                        templateUrl: 'partial/activity-contents.html',
                        controller: 'ActivityCtrl as vm'
                    }
                }
            })

            // students list
            .state("app.students", {
                url: '/s',
                views: {
                    'main@': {
                        templateUrl: 'partial/students-contents.html',
                        controller: 'GroupCtrl as vm'
                    }
                }
            })

            // student
            .state("app.student", {
                url: '/s/{email}',
                views: {
                    'main@': {
                        templateUrl: 'partial/student-progress-contents.html',
                        controller: 'StudentProgressCtrl as vm'
                    }
                }
            })

            // group
            .state("app.old_group", {
                url: '/og/{name}',
                views: {
                    'main@': {
                        templateUrl: 'partial/group-contents.html',
                        controller: 'GroupCtrl as vm'
                    }
                }
            })

            // new group
            .state("app.group", {
                url: '/g/{name}',
                views: {
                    'main@': {
                        templateUrl: 'partial/new-group-contents.html',
                        controller: 'NewGroupCtrl as vm'
                    }
                }
            })

            // página de rankings
            .state("app.rankings", {
                url: '/rankings',
                views: {
                  'main@': {
                    controller: 'RankingsController as rc',
                    templateUrl: 'partial/ranking-view.html'
                  }
                }
            });

        $mdThemingProvider.theme('default')
            .primaryPalette('indigo') // indigo
            .accentPalette('green') // green
            .warnPalette('red')
            .backgroundPalette('grey');

        $mdThemingProvider.theme('docs-dark', 'default')
            .primaryPalette('green').dark();
    });

    tst.filter('split', function() {
        return function(input, splitChar, splitIndex) {
            // do some bounds checking here to ensure it has that index
            return input.split(splitChar)[splitIndex];
        }
    });

    tst.controller('RankingsController', function RankingsController(user) {
        console.log("Rankings controller inicializado")
        
        user.load_ranking();
    });


    tst.controller('HeaderCtrl', function HeaderCtrl(){
        var vm = this;
    });

    tst.controller('ChallengeRankingCtrl', function ChallengeRankingCtrl(user, ChallengeSrvc, $location, $http, msgToast) {
        var vm = this;

        vm.gravatar = gravatar;

        vm.range = function (number) {
            return _.times(number);
        }

        user.load().then(function () {
            // identify challenge mode from location
            vm.mode = $location.url().split('/')[2];
            vm.group = user.current_group;

            vm.loading = true;
            ChallengeSrvc.get_ranking(vm.group, vm.mode).then(function (ranking_data) {
                vm.loading = false;
                vm.ranking = ranking_data.ranking;
                vm.ranking.state = ranking_data.challenge_state;
            }, function () {
                vm.loading = false;
                vm.not_found = true;
            });
        })

    })

    tst.controller('ChallengeCtrl', function ChallengeCtrl(user, ChallengeSrvc, $location, $http, msgToast) {
        var vm = this;
        chctrl = vm;
        vm.save = save;
        vm.moment = moment;
        vm.countdown = function (dt) {
            return momentDiff(moment(dt))
        }

        function format_moment(m) {
            if (!m.isValid()) {
                return '';
            }
            const p = m.format('DD MMM YYYY H:mm').split(" ");
            return `${p[0]}/${p[1].toLowerCase()}/${p[2]}, ${p[3]}`;
        }

        vm.loading = false;
        user.load().then(function () {
            // identify challenge mode from location
            vm.mode = $location.url().split('/')[2];
            vm.group = user.current_group;

            ChallengeSrvc.get_by_id(vm.group, vm.mode).then(function (challenge_instance) {
                vm.loading = false;
                vm.challenge = challenge_instance;
                user.challenge = vm.challenge;
                vm.open_at = format_moment(moment(vm.challenge.open_datetime));
                vm.open_at_fromNow = moment(vm.challenge.open_datetime).fromNow(true);

                vm.start_at = format_moment(moment(vm.challenge.start_datetime));
                vm.start_at_fromNow = moment(vm.challenge.start_datetime).fromNow(true);

                vm.end_at = format_moment(moment(vm.challenge.end_datetime));
                vm.end_at_fromNow = moment(vm.challenge.end_datetime).fromNow(true);

                vm.close_at = format_moment(moment(vm.challenge.close_datetime));
                vm.close_at_fromNow = moment(vm.challenge.close_datetime).fromNow(true);
            }, function () {
                vm.loading = false;
                vm.not_found = true;
            });
        })

        function save() {
            if (vm.challenge.state === 'finished') {
                msgToast.show('Challenge não pode mais ser alterado');
                return;
            }
            var patch = [
                {"op":"replace", "path":"/end_datetime", "value":vm.challenge.end_datetime},
                {"op":"replace", "path":"/start_datetime", "value":vm.challenge.start_datetime}
            ];
            $http({
                method: 'PATCH',
                url: api_url + '/group/' + vm.group + '/challenge/' + vm.mode,
                cache: false,
                data: JSON.stringify(patch),
                headers: {'Authorization': 'Bearer ' + user_token.token}
            }).then(function () {
                vm.dirty = false;
                msgToast.show('Challenge salvo (end e start apenas)')
            }, function (response) {
                console.error("PATCH de alteração do challenge falhou");
                msg = response.data.messages[0];
                alert(msg);
            })
        }
    });


    tst.controller('UserCtrl', function UserCtrl(user, msgToast, $http, $mdDialog, $state){
        var vm = this;
        var GRAVATAR = "http://www.gravatar.com/"

        vm.save_user = save_user;
        vm.reload_user = reload_user;
        vm.search_group = search_group;
        vm.select_group = select_group;

        if (user.mode) {
            $state.go('app.home');
        }
        
        Object.defineProperties(vm, {
            user_gravatar_profile: {get: function () {return user.gravatar ? GRAVATAR + user.gravatar.split("/")[4] : "";}}
        });

        function select_group(groupname) {
            if (user.current_group === groupname)
                return;

            $http({
                method: 'PATCH',
                url: api_url + '/user/' + user.email,
                cache: false,
                data: JSON.stringify( [{"op":"replace", "path":"/current_group", "value":groupname}] ),
                headers: {'Authorization': 'Bearer ' + user_token.token}
            }).then(function () {
                user.current_group = groupname;
                user.load().then(function() {
                    $state.go("app.home");
                }, function (msg) {
                    alert('ERRO: ' + msg)
                });
            }, function (response) {
                console.error("PATCH de alteração do grupo do usuário falhou");
                console.error(response);
                msg = response.data.messages[0];
                alert(msg);
            })
        }

        function search_group(ev) {
            var confirm = $mdDialog.prompt()
                  .title('Digite o código do curso/grupo:')
                  .placeholder('código do curso')
                  .ariaLabel('Código do curso')
                  .targetEvent(ev)
                  .ok('Buscar')
                  .cancel('Cancelar');
                $mdDialog.show(confirm).then(function(groupname) {
                  $http({
                        method: 'GET',
                        url: api_url + '/group/' + groupname,
                        cache: false,
                        headers: {'Authorization': 'Bearer ' + user_token.token}
                  }).then(function (response) {
                        var group = response.data;
                        user.groups[groupname] = {
                            label: group.label,
                            open_domain: group.open_domain
                        }
                  }, function (response) {
                        alert('Grupo indisponível');
                        console.log('OOPS!');
                        rresp = response;
                  })
                }, function() {
                  console.log("busca/adição de curso cancelada");
                });
            
        }

        function add_new_group() {
            if (_.has(user.groups, vm.new_group)) {
                msgToast.show("Grupo já registrado");
                return;
            }

            var patch = [
                {"op":"replace", "path":"/current_group", "value":vm.new_group}
            ]
            $http({
                method: 'PATCH',
                url: api_url + '/user/' + user.email,
                cache: false,
                data: JSON.stringify(patch),
                headers: {'Authorization': 'Bearer ' + user_token.token}
            }).then(function () {
                msgToast.show("Você foi corretamente registrado no curso/grupo")
                user.load({reload: true, msg: null});
                user.groups[vm.new_group] = {}
                vm.new_group = "";
            }, function (response) {
                console.log('OOPS!');
                alert('Grupo não disponível.')
                vm.input_msg = "Não foi possível recuperar os dados do curso/grupo";
                rresp = response;
            })
        }

        function save_user() {
            var patch = [
                {"op":"replace", "path":"/name", "value":user.name},
                {"op":"replace", "path":"/nickname", "value":user.nickname}
            ]
            msgToast.show("Salvando dados do usuário")
            $http({
                method: 'PATCH',
                url: api_url + '/user/' + user.email,
                cache: false,
                data: JSON.stringify(patch),
                headers: {'Authorization': 'Bearer ' + user_token.token}
            }).then(function () {
                // on success
            }, function () {
                // on erros
            })
        }

        function reload_user() {
            user.load({reload: true, msg: 'Atualizando dados do usuário'});
        }
    });

    tst.controller('MenuCtrl', function (user, msgToast, $state){
        var vm = this;
        var VISIBLE_STATES = ['open', 'new'];
        var visible_assignments;

        menuctrl = vm;
        // controller's API
        vm.fab_open = true;
        vm.fab_direction = "down";
        vm.fab_mode = "md-fling";
        vm.is_selected = is_selected;

        function is_selected(assignment) {
            return assignment === user.selected;
        }

        vm.has_students = function () {
            var role = group.user_role(user.email)
            return role === 'professor' || role === 'tutor'
        }
        vm.has_activities = function () {
            var role = group.user_role(user.email)
            return role === 'professor' || role === 'tutor'
        }
        vm.reload_assignments = reload_assignments;
        vm.visible_units = visible_units;
        // todo: rename to is_visible_assignment
        //       or add method visible to assignment object
        vm.is_visible = is_visible;
        vm.reading_assignments = reading_assignments;
        vm.unit_assignments = unit_assignments;
        vm.alert = alert;
        vm.toggle = toggle;

        // private methods
        function toggle() {
            alert('close sidenav');
        }

        function reload_assignments() {
            user.load({reload: true, msg: 'Atualizando atividade'})
            //$state.go('app.home');
        }

        function visible_units() {
            if (!user.current_group)
                return undefined;

            visible_assignments = _.filter(user.assignments, a => _.includes(VISIBLE_STATES, a.state));
            var group = user.current_group;
            var units = _.keys(user.groups[group].units).reverse()
            units = _.filter(units, u => _.includes(_.map(visible_assignments, 'unit'), u))
            return units;
        }

        function is_visible(assignment) {
            return _.includes(VISIBLE_STATES, assignment.state);
        };

        function reading_assignments() {
            return user.reading_assignments;
        };

        function unit_assignments(unit) {
            if (unit == undefined) {
                console.error('unit should not be undefined: returning all assignments')
                return visible_assignments;
            }

            return _.filter(visible_assignments, a => a.unit == unit);
        };

        function alert(msg) {
            alert(msg);
        }

    });

    tst.filter('relative', function() {
      return function(dt_str) {
        var today = new Date();
        var today_str = today.toISOString().split("T")[0];
        if (dt_str.split("T")[0] === today_str)
            return "Hoje";

        var yesterday = new Date(today - 24*60*60*1000)
        var yesterday_str = yesterday.toISOString().split("T")[0];
        if (dt_str.split("T")[0] === yesterday_str)
            return "Ontem";

        var ymd = dt_str.split("-")
        return ymd[2] + "-" + ymd[1] + "-" + ymd[0];
      };
    });


    tst.service('StudentsService', function StudentsService($http, $q) {
        var service = this;

        service.load = function (name) {
            return $http({
                method: 'GET',
                url: api_url + '/group/' + name + '/students',
                cache: false,
                headers: {'Authorization': 'Bearer ' + user_token.token}
            })
            .then(function (response) {
                //success
                data = response;
                service.students = _.map(response.data, e => new Student(e));
            }, function (err) {
                //err
            });
        }
    });

    tst.service('group', function GroupService($http, $q) {
        var group = this;
        wgroup = this; // DEBUG only

        // Group service API
        group.load = load;
        group.block_student = block_student;

        // private functions       // DEPRECATED
        function load_students() {
            if (!group.group_name) {
                alert('ERRO: grupo não definido');
                console.error('ERRO: grupo não definido')
                return
            }

            console.log("will read students from group: " + group.group_name);

            var promise = $http({
                method: 'GET',
                url: api_url + '/group/' + group.group_name + '/students',
                cache: false,
                headers: {'Authorization': 'Bearer ' + user_token.token}
            }).then(function (response) {
                // create student map
                group.student_map = {}
                _.each(response.data, function(s) {
                    group.student_map[s.email] = new Student(s);
                });
            }, function () {
                var msg = "ERRO: não foi possível ler estudantes do grupo " + group.group_name;
                alert(msg);
                console.error(msg);
            });

            return promise;
        }

        function block_student(student) {
            console.debug('in block_student')
            var promise = $http({
                method: 'PATCH',
                url: api_url + '/user/' + student.email,
                cache: false,
                data: JSON.stringify([{"op":"replace", "path":"/mode", "value":"blocked"}]),
                headers: {'Authorization': 'Bearer ' + user_token.token}
            }).then(function(response) {
                student.mode = 'blocked';
                console.debug('student blocked')
            }, function(err) {
                alert("Não foi possível bloquear o estudante");
            });

            console.debug('end of block_student')
            return promise;
        }

        function load(group_name) {
            var promise = $http({
                method: 'GET',
                url: api_url + '/group/' + group_name,
                cache: true,
                headers: {'Authorization': 'Bearer ' + user_token.token}
            }).then(function(response) {
                _.extend(group, response.data);
                if (group.students) {
                    group.students.sort();
                }
            }, function(err) {
                var msg = "Não foi possível ler dados do grupo.";
                alert(msg);
                console.log(msg);
                console.log(err);
            });

            return promise;
    
        }

    });

    tst.service('ChallengeSrvc', function ChallengeSrvc($http) {

        // Service API

        this.get_by_id = function get_by_id(groupname, mode) {
            var promise = $http({
                method: 'GET',
                url: api_url + '/group/' + groupname + '/challenge/' + mode,
                cache: true,
                headers: {'Authorization': 'Bearer ' + user_token.token}
            }).then(function (response) {
                return new Challenge(response.data);
            });
            
            return promise;
        }

        this.get_ranking = function get_ranking(groupname, mode) {
            var promise = $http({
                method: 'GET',
                url: api_url + '/group/' + groupname + '/challenge/' + mode + '/ranking',
                cache: false,
                headers: {'Authorization': 'Bearer ' + user_token.token}
            }).then(function (response) {
                return response.data;
            });
            
            return promise;
        }
    });
    
    
    tst.controller('BrowseCtrl', function BrowseCtrl(user, $http) {
        var vm = this;
        bctrl = vm;

        // API
        vm.activities = null;
        vm.activities_data = null;
        vm.available_activities = available_activities;

        // initialization
        vm.loading = true;
        user.load().then(function() {
            $http({
                method: 'GET',
                url: api_url + '/browse',
                cache: false,
                headers: {'Authorization': 'Bearer ' + user_token.token}
            }).then(function (response) {
                vm.activities_data = response.data;
                vm.activities = _.values(vm.activities_data);
            }, function (response) {
                console.error("busca de activities falhou");
                msg = response.data.messages[0];
                alert(msg);
            })
        });

        // private functions
        function available_activities() {
            return vm.activities || [];
        }

        function toggle_student_unit(student, unit, ev) {
            var verb = student.unit_state(unit) === 'locked' ? 'Desbloquear' : 'Bloquear';
            var confirm = $mdDialog.confirm()
                .title(verb + ' unidade ' + unit + "?")
                .ariaLabel('Unidade')
                .targetEvent(ev)
                .ok(verb)
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function() {
                user.toggle_unit_lock(student, unit).then(function () {
                    student.toggle_unit(unit);
                });
            }, function() {
                console.log("toggling de unidade cancelada");
            });
        }

    });

    tst.controller('GroupCtrl', function GroupCtrl(StudentsService, user, group, $location, $mdDialog) {
        var vm = this;

        // identify challenge mode from location
        const groupname = $location.url().split('/')[2];
        StudentsService.load(groupname || 'prog1-20181')
        .then(function () {
            vm.new_students = StudentsService.students;
        });

        // API
        vm.num_activities = {};
        vm.filter = filter;
        vm.toggle_student_unit = toggle_student_unit;
        vm.block_student = group.block_student;

        // initialization
        vm.loading = true;
        user.load().then(function() {
            group.load(user.current_group).then(function () {
                vm.group = group;
                vm.loading = false;
                if (vm.group.plan) {
                    _.each(vm.group.plan.units, u => vm.num_activities[u.name] = u.activities.length);
                }
            }, function () {
                vm.loading = false;
                alert('ERROR: não foi possível ler dados do grupo')
            });
        });

        // private functions
        function filter(filter_text) {
            if (typeof filter_text === 'undefined') {
                return undefined;
            }

            if (filter_text.indexOf(":") < 0) {
                return {email: filter_text};
            }

            var tokens = filter_text.split(":");
            if (tokens[0] == "u") {
                return {'current_unit': tokens[1]};
            }
        }

        function toggle_student_unit(student, unit, ev) {
            var verb = student.unit_state(unit) === 'locked' ? 'Desbloquear' : 'Bloquear';
            var confirm = $mdDialog.confirm()
                .title(verb + ' unidade ' + unit + "?")
                .ariaLabel('Unidade')
                .targetEvent(ev)
                .ok(verb)
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function() {
                user.toggle_unit_lock(student, unit).then(function () {
                    student.toggle_unit(unit);
                });
            }, function() {
                console.log("toggling de unidade cancelada");
            });
        }

    });

    tst.filter('screen_name', function() {
        return function screen_name(name) {
            if (!name)
                return undefined;
            if (name.indexOf('@') > -1)
                return name.split("@")[0];

            var tokens = name.split(" ");
            var first = tokens[0].charAt(0).toUpperCase() + tokens[0].slice(1);
            if (tokens.length > 1) {
                var i = tokens.length - 1;
                return first + " " + tokens[i].charAt(0).toUpperCase() + tokens[i].slice(1);
            } else {
                return first;
            }
        };
    });
    

    tst.filter('reverse', function() {
        return function(items) {
            return items.slice().reverse();
        };
    });
    
    tst.controller('markdownctrl', function markdownctrl () {
        this.text = '# testando\n\num parágrafo\n\nmais um parágrafo.\n\n* bullets\n* outro\n'
    });

    tst.directive('tstStudent', function tstStudent() {
        return {
            restrict: 'E',
            transclude: true,
            templateUrl: 'partial/student-directive.html',
            link: function (scope, element, attribs) {
                element.bind('mouseenter', function () {
                    element.addClass('bold');
                });
                element.bind('mouseleave', function () {
                    element.removeClass('bold');
                });
            }
        }
    });

    tst.directive('tstMarkdown', ['$compile', function markdownDirective($compile) {
        var sd_converter = new showdown.Converter();
        return {
            restrict: 'E',
            require: '?ngModel',
            link: function(scope, element, attrs, ngModelCtrl) {
                scope.$watch(attrs['ngModel'], function() {
                    var text = ngModelCtrl.$modelValue;
                    if (typeof text === "undefined" || !text)
                        return
                    var html = sd_converter.makeHtml(ngModelCtrl.$modelValue);
                    var compiled = $compile(html)(scope);
                    element.replaceWith(compiled);
                    element = compiled;
                    e = element;
                })
            }
        }
    }]);

    tst.directive('hoverClass', function() {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                element.bind('mouseenter', function () {
                    scope.$apply(function () {
                        _.each(attributes.hoverClass.split(" "), e => element.addClass(e));
                    });
                });
                element.bind('mouseleave', function () {
                    scope.$apply(function () {
                        _.each(attributes.hoverClass.split(" "), e => element.removeClass(e));
                    });
                })
            }
        };
    });

    tst.directive('tstCountdown', function ($timeout) {
      function update(scope, element, attrs) {
        var remaining = clock(scope.actualTime, attrs.look, attrs.seconds);
        element.html("<span>" + remaining + "</span>");
        $timeout(function () {update(scope, element, attrs);}, 1000);
      }
      
      return {
        scope: {
          actualTime: '=tstCountdown',
        },
        link: function(scope, element, attrs) {
          update(scope, element, attrs);
        }
      };
    });

    tst.directive('remainingTime', function($timeout) {
      
      function update(scope, element) {
        element.text(getRemainingDateTimeStringTST(scope.actualTime));
        $timeout(function() { update(scope, element); }, 1000);
      }
      
      return {
        scope: {
          actualTime: '=remainingTime'
        },
        link: function(scope, element) {
          update(scope, element);
        }
      };
    });

    tst.directive('relativeCountingTime', function($timeout) {
      
      function update(scope, element) {
        element.text(getRelativeDateTimeStringTST(scope.actualTime));
        $timeout(function() { update(scope, element); }, 1000);
      }
      
      return {
        scope: {
          actualTime: '=relativeCountingTime'
        },
        link: function(scope, element) {
          update(scope, element);
        }
      };
    });

    tst.directive('relativeTime', function($timeout) {
      
      function update(scope, element) {
        element.text(getRelativeDateTimeString(scope.actualTime));
        $timeout(function() { update(scope, element); }, 1000);
      }
      
      return {
        scope: {
          actualTime: '=relativeTime'
        },
        link: function(scope, element) {
          update(scope, element);
        }
      };
    });

    function getRelativeDateTimeString(dt) {
        if (typeof dt === 'string')
            dt = new Date(dt);
        if(typeof dt ===  undefined) return undefined;
        if(!dt) return undefined;

        var delta = parseInt(((new Date().getTime()) - dt.getTime()) / 1000);
        if (delta < 0) return "...";
        if (delta < 2 * 60) return "há um minuto";
        if (delta < 10 * 60) return "há alguns minutos";
        if (delta < 45 * 60) return "há " + Math.floor(delta/60) + " minutos";
        if (delta < 90 * 60) return "há uma hora";
        if (delta < 24 * (60*60)) return "há " + Math.floor(delta/60/60) + " horas";
        if (delta < 48 * (60*60)) return "ontem";
        if (delta < 30 * (24 * (60*60))) return "há " + Math.floor(delta/60/60/24) + " dias";
        if (delta < 12 * (30 * (24 * (60*60)))) {
            var months = Math.floor(delta/60/60/24/30);
            return (months <= 1) ? "há um mês" : ("há " + months + " meses");
        } else {
            var years = Math.floor(delta/60/60/24/365);
            return (years <= 1) ? "há um ano" : ("há" + years + " anos");
        }
    }

    function getRelativeDateTimeStringTST(dt) {
        if (typeof dt ===  undefined) return undefined;
        if (typeof dt === 'string')
            dt = new Date(dt);
        if (!dt) return undefined;

        var delta = parseInt(((new Date().getTime()) - dt.getTime()) / 1000);
        
        // tempo negativo: algum erro
        if (delta < 0) {
            delta = -delta
            // return "... (a hora está correta?)";
        }

        // abaixo de 1min = 1 * 60 segundos
        if (delta < 1 * 60) {
            return Math.floor(delta) + "s";
        }

        // abaixo de 60min = 1 * 60 * 60 segundos
        if (delta < 1 * 60 * 60) {
            var minutes = Math.floor(delta/60);
            var seconds = Math.floor(delta - 60*minutes);
            return minutes + "m " + seconds + "s";
        }

        // abaixo de 24h = 24 * 60 * 60 segundos
        if (delta < 24 * 60 * 60) {
            var hours = Math.floor(delta/60/60);
            var minutes = Math.floor((delta - 60*60*hours)/60);
            var seconds = Math.floor(delta - 60*minutes - 60*60*hours);
            return hours + "h " + minutes + "m " + seconds + "s";
        }

        // abaixo de uma semana = 7 * 24 * 60 * 60 segundos
        if (delta < 7 * 24 * 60 * 60) return Math.floor(delta/60/60/24) + " dias";

        // abaixo de um mês = 30 * 24 * 60 * 60 segundos
        if (delta < 30 * 24 * 60 * 60) return Math.floor(delta/60/60/24/7) + " semanas";

        // acima de um mês = 30 * 24 * 60 * 60 segundos
        if (delta > 30 * 24 * 60 * 60) {
            var months = Math.floor(delta/60/60/24/30);
            return months == 1 ? "1 mês" : months + " meses";
        }
    }

})();

