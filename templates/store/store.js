drinkapp.controller('store', function ($scope,service_drink) {
    $scope.sotreData = service_drink.now_shop;
    
    $scope.gotoMenu = function(){
        mainNavigator.pushPage('templates/drink_menu/drinkmenu.html');
    };
    $scope.addComment = function(){
        mainNavigator.pushPage('templates/store/store_addcomment.html');
    };
    
    window.scope_store = $scope;
});