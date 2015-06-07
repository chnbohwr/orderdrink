drinkapp.controller('signup', function ($scope, $http, service_url) {

    $scope.signup_input = {
        nickname: '',
        email: '',
        password: '',
        password_confirm: ''
    };
    $scope.reg = function () {
        //todo 檢查輸入的有沒有正確
        console.log($scope.signup_input);

        //送出資訊
        $http.post(service_url.signup, $scope.signup_input).success(successReg).error(errorReg);
    };

    function successReg(data) {
        $scope.injectToken(data.token);
        mainNavigator.pushPage('templates/near/near.html');
        //看是否要顯示教學或是開啟推送功能
    }

    function errorReg(e) {
        console.log('reg error', e);
    }
    window.scope_signup = $scope;
});