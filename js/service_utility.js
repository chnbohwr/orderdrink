drinkapp.service('service_utility', function ($q) {

    /**
     * get gps information
     * @method getGPS
     */
    this.getGPS = function () {
        var defer = $q.defer();
        var options = { enableHighAccuracy: true };
        navigator.geolocation.getCurrentPosition(onSuccess, onError,options);
        // onSuccess Callback
        // This method accepts a Position object, which contains the
        // current GPS coordinates
        //
        function onSuccess(position) {
            var gps_object = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            defer.resolve(gps_object);
        }
        // onError Callback receives a PositionError object
        //
        function onError(error) {
            defer.reject(error);
        }

        return defer.promise;
    };
});