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
            $scope.message = "請輸入正確的信箱以及密碼"
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
            email: $scope.login_input.email,
            password: $scope.login_input.password
        }).success(loginSuccess).error(error);

        function error(data, status) {
            if (status === 402) {
                $scope.message = '登入錯誤';
            } else if (status === 401) {
                $scope.message = '登入錯誤';
            } else {
                $scope.message = '登入錯誤';
            }
        }
    }

    $scope.facebooklogin = function () {
        facebookConnectPlugin.login(['public_profile', 'email', 'user_friends'], function (response) {
            if (response.status === 'connected') {

                $timeout(regByFacebook, 0);
            }
        }, function () {

        });
    };

    //    {"id":"106191296386841","email":"imffqsz_zuckerson_1434104811@tfbnw.net","first_name":"Margaret","gender":"female","last_name":"Zuckerson","link":"https://www.facebook.com/app_scoped_user_id/106191296386841/","locale":"zh_TW","middle_name":"Amihgiabdejd","name":"Margaret Amihgiabdejd Zuckerson","timezone":0,"updated_time":"2015-06-12T10:27:01+0000","verified":false}


    function regByFacebook() {

        facebookConnectPlugin.api('/me', [], function (response) {

            $scope.store_response = response;
            $http.post(service_url.facebooklogin, response).success(loginSuccess).error(errorReg);
        }, errorReg);

        function errorReg() {
            console.log('facebook get user profile error');
        }
    }

    function loginSuccess(data) {

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