drinkapp.controller('caculate', function ($scope, service_drink) {

    $scope.selection = service_drink.selection;
    
    $scope.nowshop = service_drink.now_shop;

    $scope.callShop = function () {
        window.location.href = "tel://" + service_drink.now_shop.phone;
    }
    
    $scope.total = 0;
    
    for(var i in $scope.selection){
        var options = $scope.selection[i];
        for(var j in options){
            var money = options[j].price * options[j].number;
            $scope.total += money;
        }
    }

});