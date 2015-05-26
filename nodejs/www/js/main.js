var myapp = angular.module('myapp', []);
myapp.controller('mainController', function mainController($scope, service_drink) {
    service_drink.getCompanies().then(successGetCompanies);

    function successGetCompanies(data) {
        $scope.companies = data;
    }

});

myapp.service('service_drink', function service_drink($http, $q) {
    this.testApiServer = function () {
        $http.get('/api/test/').success(function (data) {
            console.log(data);
        });
    };

    this.getCompanies = function () {
        var defer = $q.defer();
        $http.get('/api/companies/').success(function (data) {
            console.log(data);
            defer.resolve(data);
        });

        return defer.promise;
    };
});