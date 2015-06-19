drinkapp.controller('signup', function ($scope, $http, service_url) {

    $scope.signup_input = {
        nickname: '',
        email: '',
        password: '',
        password_confirm: ''
    };
    $scope.reg = function () {
        if (!$scope.signup_input.nickname || !$scope.signup_input.email || !$scope.signup_input.password || !$scope.signup_input.password_confirm) {
            $scope.message = '您還有欄位沒有輸入完';
            return;
        }
        if($scope.signup_input.nickname.length>10){
            $scope.message = '暱稱不需要那麼長吧，請小於12個字';
        }
        if (!validateEmail($scope.signup_input.email)){
            $scope.message = '你輸入的信箱格式有錯誤';
            return;
        }
        if($scope.signup_input.password.length < 6){
            $scope.message = '密碼要大於6位數';
            return;
        }
        if($scope.signup_input.password.length > 30){
            $scope.message = '密碼那麼長，你是要發射核彈嗎? 請小於30字';
            return;
        }
        if($scope.signup_input.password !== $scope.signup_input.password_confirm){
            $scope.message = '密碼與確認密碼欄位輸入的內容不一樣';
            return;
        }

        //送出資訊
        $http.post(service_url.signup, $scope.signup_input).success(successReg).error(errorReg);
    };

    function validateEmail(email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
    }
    

    function successReg(data) {
        localStorage.nickname = $scope.signup_input.nickname;
        localStorage.email = $scope.signup_input.email;
        $scope.injectToken(data.token);
        mainNavigator.pushPage('templates/near/near.html');
        //看是否要顯示教學或是開啟推送功能
    }

    function errorReg(data) {
        if(data.code === 2){
            $scope.message = "你之前有註冊過了喔"
        }else if (data.code === 1){
            $scope.message = "你之前有用臉書快速註冊過了，所以以後用臉書快速登入就好了"
        }else{
            $scope.message = "總之你註冊失敗了，可是我也不知道原因，先確定網路有沒有正常吧"
        }
    }
    window.scope_signup = $scope;
});