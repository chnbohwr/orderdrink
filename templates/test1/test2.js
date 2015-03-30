module.controller('test2Controller', function ($scope, $rootScope) {
    $scope.Back = function () {
        Test1Navi.popPage();
        $rootScope.hideTabs = false;
    };
});