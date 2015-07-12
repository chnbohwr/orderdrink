drinkapp.controller('mainmenu', function ($scope) {
    
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