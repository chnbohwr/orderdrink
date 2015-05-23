drinkapp.controller('setting', function ($scope) {
    console.log('setting controller start');
    $scope.gotoEditProfile = function(){
        mainNavigator.pushPage('templates/setting/editprofile.html');
    };
});