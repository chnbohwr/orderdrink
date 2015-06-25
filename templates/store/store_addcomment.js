drinkapp.controller('store_addcomment', function ($scope, service_comment, service_drink) {
    console.log('store_addcomment controller start');
    $scope.shopname = service_drink.now_shop.company_name + '-' + service_drink.now_shop.name;
    $scope.nickname = localStorage.nickname;
    $scope.avatar_thumb= localStorage.avatar_thumb;
    $scope.message = '';
    $scope.star = "0";

    $scope.sendComment = function () {
        var data = {
            message: $scope.message,
            star: $scope.star
        };
        service_comment.createComment(data).then(function(){
            mainNavigator.popPage();
        });
    };

    window.scope_store_addcomment = $scope;
});