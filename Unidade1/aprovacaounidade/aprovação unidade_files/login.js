(function () {
  const bc = window.BroadcastChannel ? new BroadcastChannel('tst') : null;

  // Firebase log-in widget function
  function configureFirebaseLoginWidget() {
    var uiConfig = {
      'signInSuccessUrl': '/',
      'signInOptions': [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
        //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //firebase.auth.GithubAuthProvider.PROVIDER_ID,
        //firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      // Terms of service url
      'tosUrl': '<your-tos-url>',
    };

    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('#firebaseui-auth-container', uiConfig);
  }


  // Firebase log-in function
  function configureFirebaseLogin() {

    // Initialize Firebase
    const config = {
        apiKey: "AIzaSyAjIg2h0iTnVddoOq7dnTlXnoaX03vLKX4",
        authDomain: "tst-online.firebaseapp.com",
        databaseURL: "https://tst-online.firebaseio.com",
        projectId: "tst-online",
        storageBucket: "tst-online.appspot.com",
        messagingSenderId: "65095942011"
    };

    firebase.initializeApp(config);
    configureFirebaseLoginWidget();

    // setup listener
    //firebase.auth().onAuthStateChanged(function(user) {
    firebase.auth().onIdTokenChanged(function(user) {
      if (user) {
        user.getIdToken().then(function(idToken) {
          user_token.token = idToken;
          user_token.fbuser = user;
          localStorage.setItem('user_token', user_token.token);
          bc.onmessage = function (ev) {
            if (ev.data === 'tk') {
                bc.postMessage(user_token.token);
            }
          }
          const firebaseui_container = document.getElementById('firebaseui-auth-container');
          const container_element = firebaseui_container.parentElement;
          container_element.removeChild(firebaseui_container);
        });
      } else {
        console.log(`${new Date()} user logged out from firebase`);
      }
    });

  }

  // do we need firebase at all?
  if (bc) {
      bc.onmessage = function (ev) {
        if (ev.data) {
          console.log(ev);
          user_token.token = ev.data;
        }
      }
      bc.postMessage('tk');
  }

  setTimeout(function () {
    // use firebase in one second ig no other tab/window is found
    if (!user_token.token) {
        console.log('no token... trying firebase')
        configureFirebaseLogin();
    }
  }, 100);

})();
