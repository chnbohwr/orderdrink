module.controller('testpageController', function ($scope, $rootScope) {
    $scope.back = function () {
        $rootScope.hideTabs = false;
    };
});