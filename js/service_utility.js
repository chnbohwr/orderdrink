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

        var watchPromise = navigator.geolocation.watchPosition(onSuccess, onError, options);

        // onSuccess Callback
        // This method accepts a Position object, which contains the
        // current GPS coordinates
        //

        function onSuccess(position) {
            watchCount += 1;
            if (watchCount === 3) {
                navigator.geolocation.clearWatch(watchPromise);
                var gps_object = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                defer.resolve(gps_object);
            }
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