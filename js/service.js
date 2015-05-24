drinkapp.service('drink_service', function ($q, $timeout, $http) {
    var drink_service = this;

    this.getShops = function (lat, lng) {
        var defer = $q.defer();
        //do http request and return promise


        return defer.promise;
    };

    this.getShopDetail = function (shop_id) {

        var defer = $q.defer();

        $http.get('js/shopdetail.json').success(getShopDetailSuccess).error(error);

        function getShopDetailSuccess(data) {
            defer.resolve(data);
        }

        function error(e) {
            console.log('get data error', e);
            defer.reject();
        }

        return defer.promise;
    };



    window.drink_service = this;
});