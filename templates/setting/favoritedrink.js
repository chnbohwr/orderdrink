drinkapp.controller('favoriteDrink', function ($scope, $http, service_url, $rootScope) {
    //如果沒有localstroage 就做空的陣列
    if (localStorage.favoriteCompany) {
        $scope.favoriteCompany = JSON.parse(localStorage.favoriteCompany);
    } else {
        $scope.favoriteCompany = [];
    }

    $scope.message = "更新中..."
    $http.get(service_url.companies).success(function (data) {
        $scope.companies = data;
        //如果沒有設定過喜好店家就是全選
        if (!localStorage.favoriteCompany) {
            for (var i in data) {
                $scope.favoriteCompany.push(data[i].id);
            }
        }
        $scope.message = "";
    }).error(function () {
        $scope.message = "很抱歉你的網路可能有問題";
    });

    $scope.sendFavorite = function () {
        $scope.message = "更新中..."
        var data = {
            favoriteCompany: $scope.favoriteCompany
        };
        $http.post(service_url.uploadFavorite, data).success(function (data) {
            localStorage.favoriteCompany = JSON.stringify($scope.favoriteCompany);
            $rootScope.$broadcast('refreshShop');
            $scope.message = "更新成功"
        }).error(function () {
            $scope.message = "很抱歉你的網路可能有問題";
        });
    };

    window.scope_favoriteDrink = $scope;
});