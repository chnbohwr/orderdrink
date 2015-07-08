drinkapp.controller('login', function ($scope, $http, service_url, $timeout) {
    $scope.login_input = {
        email: '',
        password: ''
    };
    $scope.signup = function () {
        mainNavigator.pushPage('templates/login/signup.html');
    };

    $scope.login = function () {
        if (!$scope.login_input.email || !$scope.login_input.password) {
            alert('error, no email or password');
        } else {
            login();
        }
    };
    /**
     * @method login
     * @param {Type}
     */
    function login() {
        $http.post(service_url.login, {
            email: $scope.email,
            password: $scope.password
        }).success(loginSuccess).error(error);



        function error(e) {
            if (e.code === 1) {
                $scope.message = '之前用臉書快速登入過的用戶請點下面快速登入就好';
            } else if (e.code === 0) {
                $scope.message = '是不是有輸入帳號密碼錯誤阿? 要不要再檢查看看';
            } else {
                $scope.message = '反正就是登入錯誤，要不要先確認一下網路有沒有問題?';
            }
        }
    }

    $scope.facebooklogin = function () {
        FB.login(function (response) {
            console.log(response);
            if (response.status === 'connected') {
                regByFacebook();
            }
        }, {
            scope: 'public_profile,email,user_friends'
        });
    };

    //    {"id":"106191296386841","email":"imffqsz_zuckerson_1434104811@tfbnw.net","first_name":"Margaret","gender":"female","last_name":"Zuckerson","link":"https://www.facebook.com/app_scoped_user_id/106191296386841/","locale":"zh_TW","middle_name":"Amihgiabdejd","name":"Margaret Amihgiabdejd Zuckerson","timezone":0,"updated_time":"2015-06-12T10:27:01+0000","verified":false}


    function regByFacebook() {
        FB.api('/me', function (response) {
            $scope.store_response = response;
            $http.post(service_url.facebooklogin, response).success(loginSuccess).error(errorReg);
        });


        function errorReg() {
            alert('facebook login error');
        }
    }

    $scope.term = function () {
        mainNavigator.pushPage('templates/login/term.html');
    }

    $scope.privacy = function () {
        mainNavigator.pushPage('templates/login/privacy.html');
    }


    function loginSuccess(data) {
        console.log(data);
        localStorage.nickname = data.nickname;
        localStorage.email = data.email;
        localStorage.id = data.id;
        localStorage.avatar_thumb = data.avatar_thumb;
        localStorage.avatar = data.avatar;
        localStorage.background = data.background
        localStorage.favoriteCompany = data.favoriteCompany;
        $scope.injectToken(data.token);
        mainNavigator.pushPage('templates/near/near.html');
    }

    window.scope_login = $scope;
});