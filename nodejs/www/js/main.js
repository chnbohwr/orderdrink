var myapp = angular.module('myapp', []);
myapp.controller('mainController', function mainController($scope, service_drink) {
    service_drink.getCompanies().then(successGetCompanies);

    function successGetCompanies(data) {
        $scope.companies = data;
    }

    function successGetMenu(data) {
        //如果有資料就放進去
        if (data.list) {
            $scope.menu = data;
        } else {
            $scope.menu = {
                list: []
            };
        }
        $scope.message = "取得資訊成功";
    }

    $scope.$watch('selected', function (value) {
        if (value) {
            $scope.message = "正在取得資訊";
            service_drink.companyGetMenu(value).then(successGetMenu);
            $scope.now_company_id = value;
        }
    });

    $scope.createType = function () {
        var default_type = {
            name: '',
            items: []
        };

        $scope.menu.list.push(default_type);
    };

    $scope.createItem = function (type) {
        var item = {
            name: '',
            price_m: '25',
            price_m: '30',
            static_sugar: false,
            hot: true,
            onlyhot: false
        };
        type.items.push(item);
    }

    $scope.removeItem = function (index, type) {
        type.items.splice(index, 1);
    };

    $scope.removeType = function (index) {
        $scope.menu.list.splice(index, 1);
    };

    $scope.save = function () {
        $scope.message = "正在存檔";
        service_drink.saveMenu($scope.now_company_id, $scope.menu).then(function () {
            $scope.message = "存檔成功";
        });
    };

    window.scope = $scope;
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

    this.saveMenu = function (company_id, menu) {
        var defer = $q.defer();
        $http.post('/api/company/menu', {
            company_id: company_id,
            menu: menu
        }).success(function () {
            defer.resolve();
        }).error(function (e) {
            defer.reject(e);
        })
        return defer.promise;
    }
});