drinkapp.controller('setting', function ($scope, $http, service_url,service_user) {

    $scope.nickname = localStorage.nickname || undefined;;
    $scope.email = localStorage.email || '';;
    $scope.avatar = localStorage.avatar || undefined;
    
    $scope.goFavoriteDrink= function(){
        mainNavigator.pushPage('templates/setting/favoritedrink.html');
    };

});