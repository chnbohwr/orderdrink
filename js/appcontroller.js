drinkapp.controller('AppController', function ($scope, service_drink, $http, $timeout,service_url) {

    console.log('scope start up');

    ons.ready(checklogin);

    function checklogin() {
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
        
        $scope.user_id = localStorage.id;
        $scope.serverurl = service_url.server_url;
    };

    function FacebookLoginStatus() {
        if (!window.FB) {
            $timeout(FacebookLoginStatus, 500);
            return;
        }
        //偵測看看 facebook 啟動了沒
        FB.getLoginStatus(function (response) {

            $scope.$apply(function () {
                $scope.fb_init = true;
            });


        });
    }

    $scope.goback = function () {
        mainNavigator.popPage();

    };
    
    $scope.shopAvatar = function(comapny_id){
        switch(comapny_id){
            case 1: 
                return 'img/shop01.jpg';
            case 2:
                return 'img/shop02.jpg';
            case 3:
                return 'img/shop03.jpg';
            case 4:
                return 'img/shop04.jpg';
            case 5:
                return 'img/shop05.jpg';
            case 6:
                return 'img/shop06.jpg';
            case 7:
                return 'img/shop07.jpg';
            case 8:
                return 'img/shop08.jpg';
            case 9:
                return 'img/shop09.jpg';
            case 10:
                return 'img/shop10.jpg';
            default:
                return 'img/drink-icon-72.png'
        }
    }

    window.scope = $scope;
    window.http = $http;
});