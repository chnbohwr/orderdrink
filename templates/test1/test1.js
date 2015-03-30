module.controller('test1Controller', function ($scope, $rootScope) {
    $scope.NextPage = function () {
        $scope.Test1Navi.pushPage('templates/test1/test2.html');
        $rootScope.hideTabs = true;
    }

    console.log('test1 start');
});