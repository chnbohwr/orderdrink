drinkapp.controller('near', function ($scope) {
    console.log('near controller start');
    var map, marker, infowindow;
    var fakeGeolocation = {
        lat: 22.6410656,
        lng: 120.2995031
    };

    $scope.initialMap = function () {
        var map_element = $('#googlemap');
        var position = new google.maps.LatLng(fakeGeolocation.lat, fakeGeolocation.lng);

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
    };

    $scope.initialMap();

    $scope.gotoStore = function () {
        mainNavigator.pushPage('templates/store/store.html');
    };

    $scope.gotoSetting = function () {
        mainNavigator.pushPage('templates/setting/setting.html');
    };

});