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
        }).success(success).error(error);

        //登入成功就把 token 注入
        function success(data) {
            // todo 要記得下載個人資料以及其他資料
            $scope.injectToken(data.token);
            //導向內頁
            mainNavigator.pushPage('templates/near/near.html');
        }

        function error(e) {
            console.log(e);
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
            $http.post(service_url.facebooklogin, response).success(successReg).error(errorReg);
        });

        function successReg(data) {
            console.log(data);
            localStorage.nickname = data.nickname;
            localStorage.email = data.email;
            localStorage.$loki = data.$loki;
            $scope.injectToken(data.token);
            mainNavigator.pushPage('templates/near/near.html');
        }
        
        function errorReg(){
            alert('facebook login error');
        }
    }
    
    $scope.term = function(){
    mainNavigator.pushPage('templates/login/term.html');
    }
    
    $scope.privacy = function(){
    mainNavigator.pushPage('templates/login/privacy.html');
    }


    window.scope_login = $scope;
});