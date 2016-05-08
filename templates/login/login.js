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

   
});