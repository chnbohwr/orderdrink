drinkapp.controller('setting', function ($scope) {
    console.log('setting controller start');
    $scope.nickname = localStorage.nickname;
    $scope.email = localStorage.email;
    $scope.gotoEditProfile = function(){
        mainNavigator.pushPage('templates/setting/editprofile.html');
    };
});