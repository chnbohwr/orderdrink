drinkapp.controller('store', function ($scope, service_drink, service_comment) {
    $scope.storeData = service_drink.now_shop;
    console.log($scope.storeData);
    service_comment.initial($scope.storeData.id).then(function () {
        $scope.comments = service_comment.comments;
    });

    $scope.gotoMenu = function () {
        service_drink.getShopMenu(service_drink.now_shop.id).then(function () {
            mainNavigator.pushPage('templates/drink_menu/drinkmenu.html');
        }, function () {
            alert('發生了一點錯誤');
        });

    };
    $scope.addComment = function () {
        mainNavigator.pushPage('templates/store/store_addcomment.html');
    };

    window.scope_store = $scope;
});