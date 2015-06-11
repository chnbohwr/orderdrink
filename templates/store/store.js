drinkapp.controller('store', function ($scope,service_drink,service_comment) {
    $scope.storeData = service_drink.now_shop;
    console.log($scope.storeData);
    service_comment.initial($scope.storeData.$loki).then(function(){
        $scope.comments = service_comment.comments;
    });
    
    $scope.gotoMenu = function(){
        mainNavigator.pushPage('templates/drink_menu/drinkmenu.html');
    };
    $scope.addComment = function(){
        mainNavigator.pushPage('templates/store/store_addcomment.html');
    };
    
    window.scope_store = $scope;
});