drinkapp.service('service_utility', function ($q) {

    /**
     * get gps information
     * @method getGPS
     */
    this.getGPS = function () {

        var defer = $q.defer();
        var watchCount = 0;
        var options = {
            maximumAge: 3000,
            timeout: 5000,
            enableHighAccuracy: true
        };

        var watchPromise;

        navigator.geolocation.getCurrentPosition(function (position) {
            //如果順利取得 gps 資訊就回傳回去
            var gps_object = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            defer.resolve(gps_object);
        }, function () {
            //如果單點取得gps 有問題 就使用連續的
            watchPromise = navigator.geolocation.watchPosition(onSuccess, onError, options);
        }, {
            timeout: 2000,
            enableHighAccuracy: true
        })

        // onSuccess Callback
        // This method accepts a Position object, which contains the
        // current GPS coordinates
        //

        function onSuccess(position) {
            navigator.geolocation.clearWatch(watchPromise);
            var gps_object = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            defer.resolve(gps_object);
        }


        // onError Callback receives a PositionError object
        //
        function onError(error) {
            navigator.geolocation.clearWatch(watchPromise);
            defer.reject(error);
        }

        return defer.promise;
    };
});