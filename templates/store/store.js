drinkapp.controller('store', function ($scope) {
    console.log('store controller start');
    
    $scope.gotoMenu = function(){
        mainNavigator.pushPage('templates/drink_menu/drinkmenu.html');
    };
    $scope.addComment = function(){
        mainNavigator.pushPage('templates/store/store_addcomment.html');
    };
});