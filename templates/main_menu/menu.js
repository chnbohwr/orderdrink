drinkapp.controller('mainmenu', function ($scope) {
    console.log('mainmenu controller start');
    $scope.gotoNear = function(){
        mainNavigator.pushPage('templates/near/near.html');
    };
    $scope.gotoSetting = function(){
        mainNavigator.pushPage('templates/setting/setting.html');
    };
    $scope.gotoNewsfeed = function(){
        mainNavigator.pushPage('templates/newsfeed/newsfeed.html');
    };
});