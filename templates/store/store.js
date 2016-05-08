drinkapp.controller('store', function ($scope, service_drink, service_comment, $timeout) {
    $scope.storeData = service_drink.now_shop;
   
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
        if (!localStorage.token) {
            // if not login , ask user.
            $scope.loginDialog.show();
            
        } else {
            $timeout(function () {
                mainNavigator.pushPage('templates/store/store_addcomment.html');
            }, 300);
        }
        
    };

});