var myapp = angular.module('myapp', []);
myapp.controller('mainController', function mainController($scope, service_drink) {
    service_drink.getCompanies().then(successGetCompanies);

    function successGetCompanies(data) {
        $scope.companies = data;
    }

    $scope.$watch('selected', function (value) {
        if (value) {
            service_drink.getShops(value).then(function (shops) {
                $scope.shops = shops;
                console.log(shops);
            }, function () {})
        }
    });

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

    this.getShops = function (company_id) {
        var defer = $q.defer();
        $http.post('/api/shops/', {
                company_id: company_id
            })
            .success(function (data) {
                defer.resolve(data);
            }).error(function (e) {
                defer.reject(e);
            });

        return defer.promise;
    };

    this.companyGetMenu = function (company_id) {
        var defer = $q.defer();
        $http.get('/api/company/menu/', {
                params: {
                    company_id: company_id
                }
            })
            .success(function (data) {
                defer.resolve(data);
            }).error(function (e) {
                defer.reject(e);
            });

        return defer.promise;
    };
});