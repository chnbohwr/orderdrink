drinkapp.controller('login', function ($scope, $http, service_url) {
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

        function success(data) {
            localStorage.token = data.token;
        }

        function error(e) {
            console.log(e);
        }
    }

    window.scope_login = $scope;
});