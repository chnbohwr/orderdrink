module.controller('loginController', function ($scope) {
    $scope.Login = function () {
        $scope.MainNavi.pushPage('templates/tabs/tabs.html');
    };
});