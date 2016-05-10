drinkapp.controller('AppController', function ($scope, service_drink, $http, $timeout, service_url) {

    ons.ready(getFBLoginStatus);


    //注入token 到 HTTP headers 裡面，這邊要讓登入頁面可以呼叫
    $scope.toHome = function (token) {
        mainNavigator.pushPage('templates/near/near.html');
    };


    $scope.goback = function () {
        mainNavigator.popPage();

    };

    $scope.shopAvatar = function (comapny_id) {
        switch (comapny_id) {
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
    };

    //create login dialog
    ons.createDialog('templates/login/loginDialog.html', {
        parentScope: $scope
    }).then(function (dialog) {
        $scope.loginDialog = dialog;
    });

    $scope.facebooklogin = function () {

        $('.login-card .facebook > p').text('登入中...');

        facebookConnectPlugin.login(['public_profile', 'email', 'user_friends'], function (response) {
            if (response.status === 'connected') {
                $timeout(regByFacebook, 0);
            }
        }, function () {

        });
    };

    //    {"id":"106191296386841","email":"imffqsz_zuckerson_1434104811@tfbnw.net","first_name":"Margaret","gender":"female","last_name":"Zuckerson","link":"https://www.facebook.com/app_scoped_user_id/106191296386841/","locale":"zh_TW","middle_name":"Amihgiabdejd","name":"Margaret Amihgiabdejd Zuckerson","timezone":0,"updated_time":"2015-06-12T10:27:01+0000","verified":false}


    function regByFacebook(callback, errorcallback) {

        var query_string = '/v2.6/me?fields=picture.type(large),id,name,link,locale';

        facebookConnectPlugin.api(query_string, [], function (response) {
            $http.post(service_url.facebooklogin, response).success(function (data) {
                loginSuccess(data);
                if (callback) {
                    callback();
                }
            }).error(function () {
                if (errorcallback) {
                    errorcallback();
                }
            });
        }, function () {
            localStorage.clear();
            $scope.toHome();
        });
    }

    function loginSuccess(data) {
        localStorage.nickname = data.nickname;
        localStorage.email = data.email || '';
        localStorage.id = data.id;
        localStorage.avatar_thumb = data.avatar_thumb;
        localStorage.avatar = data.avatar;
        localStorage.background = data.background
        localStorage.favoriteCompany = data.favoriteCompany;
        $http.defaults.headers.common.token = data.token;
        localStorage.token = data.token;
        $scope.loginDialog.hide();
    }

    function getFBLoginStatus() {
        if(!window.facebookConnectPlugin) {
            $scope.toHome();
            return;
        }
        facebookConnectPlugin.getLoginStatus(function (data) {
            if (data.status !== 'connected') {
                localStorage.clear();
                $scope.toHome();
            } else {
                regByFacebook(function () {
                    $scope.toHome();
                }, function () {
                    localStorage.clear();
                    $scope.toHome();
                });
            }
        });
    }

});