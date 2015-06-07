drinkapp.controller('AppController', function ($scope, drink_service, $http) {

    console.log('scope start up');

    ons.ready(onstart);

    function onstart() {
        //1. check if token ?
        var token = localStorage.token;
        if (token) {
            $scope.injectToken(token);
            mainNavigator.pushPage('templates/near/near.html');
        } else {
            mainNavigator.pushPage('templates/login/login.html');
        }

    }

    //注入token 到 HTTP headers 裡面，這邊要讓登入頁面可以呼叫
    $scope.injectToken = function (token) {
        $http.defaults.headers.common.token = token;
    };

    window.scope = $scope;
    window.http = $http;
});