drinkapp.controller('AppController', function ($scope, service_drink, $http,$timeout) {

    console.log('scope start up');

    ons.ready(onstart);

    function onstart() {
        
        window.fbAsyncInit = function () {
            FB.init({
                appId: '933225176708506',
                xfbml: false,
                version: 'v2.3'
            });
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {
                return;
            }
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        
        FacebookLoginStatus();

    }

    //注入token 到 HTTP headers 裡面，這邊要讓登入頁面可以呼叫
    $scope.injectToken = function (token) {
        $http.defaults.headers.common.token = token;
        localStorage.token = token;
    };
    
    function FacebookLoginStatus() {
        console.log('FacebookLoginStatus');
        if(!window.FB){
            $timeout(FacebookLoginStatus,500);
        }
        //偵測看看 facebook 啟動了沒
        FB.getLoginStatus(function (response) {
            console.log(response);
            checklogin();
        });
    }
    
    function checklogin (){
        //1. check if token 
        var token = localStorage.token;
        if (token) {
            //INJECT TOKEN TO HTTP HEADERS 
            $scope.injectToken(token);
            mainNavigator.pushPage('templates/near/near.html');
        } else {
            //go to login page
            mainNavigator.pushPage('templates/login/login.html');
        }
    }

    window.scope = $scope;
    window.http = $http;
});