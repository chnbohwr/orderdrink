module.controller('tab1Controller', function ($scope, $timeout, $http,$rootScope) {

    $scope.items = [];
    $scope.load = function ($done) {
        $timeout(function () {
            $http.jsonp('http://numbersapi.com/random/year?callback=JSON_CALLBACK')
                .success(function (data) {
                    $scope.items.unshift({
                        desc: data,
                        rand: Math.random()
                    });
                })
                .error(function () {
                    $scope.items.unshift({
                        desc: 'No data',
                        rand: Math.random()
                    });
                })
                .finally(function () {
                    $done();
                });
        }, 1000);
    };

    $scope.AddPage = function (){
        $rootScope.hideTabs = true;
        Test1Navi.pushPage('templates/tab1/testpage.html');
    };
});