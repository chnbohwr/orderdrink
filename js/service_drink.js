drinkapp.service('service_drink', function ($q, $http, service_url) {
    var service_drink = this;

    this.shopList = [];

    this.getShops = function (lat, lng) {
        //make promise
        var defer = $q.defer();

        //check lat lng
        if (!lat || !lng) {
            defer.reject();
            return;
        }

        //do http request and return promise
        $http.get(service_url.nearshop, {
            params: {
                lat: lat,
                lng: lng  
            }
        }).success(function (datas) {
            service_drink.shopList = datas;
            defer.resolve();
        }).error(function (data, status) {
            service_url.errorHandler(status);
            defer.reject();
        });

        return defer.promise;
    };

    //取得店家詳細資料
    this.getShopDetail = function (shop_id) {
        var defer = $q.defer();
        $http.get(service_url.getshopdata(shop_id)).success(function (data) {
            console.log('get shop data success', data);
            service_drink.now_shop = data;
            defer.resolve();
        }).error(function () {
            defer.reject();
        });
        return defer.promise;
    };

    this.getShopMenu = function (shop_id) {
        var defer = $q.defer();
        if (!shop_id) {
            shop_id = service_drink.now_shop.id;
        }
        $http.get(service_url.getmenu(shop_id)).success(function (data) {
            console.log('get shop menu success', data);
            service_drink.now_shop_menu = data;
            defer.resolve();
        }).error(function () {
            defer.reject();
        });
        return defer.promise;
    }



    window.service_drink = this;
});