drinkapp.controller('near', function ($scope, service_utility, service_drink) {
    console.log('near controller start');
    var map, marker, infowindow;
    var lat, lng;

    $scope.initialMap = function () {
        service_utility.getGPS().then(onSuccess, onError);

        function onSuccess(gpsdata) {
            lat = gpsdata.lat;
            lng = gpsdata.lng;

            var position = new google.maps.LatLng(gpsdata.lat, gpsdata.lng);
            var map_element = $('#googlemap');
            var mapOptions = {
                zoom: 16,
                center: position,
                streetViewControl: false,
                mapTypeControl: false,
            };

            map = new google.maps.Map(map_element[0], mapOptions);

            marker = new google.maps.Marker({
                position: position,
                map: map
            });

            google.maps.event.addListener(map, 'idle', function (event) {
                map_element.find('a').remove();
            });
        }

        function onError(e) {
            alert(' get gps data error , please see console');
            console.log(e);
        }

    };

    function getShopList() {
        service_drink.getShops()
    }



    $scope.gotoStore = function () {
        mainNavigator.pushPage('templates/store/store.html');
    };

    $scope.gotoSetting = function () {
        mainNavigator.pushPage('templates/setting/setting.html');
    };

    //only fire once when login 
    mainNavigator.once('postpush', function (e) {
        $scope.initialMap();
    })

});