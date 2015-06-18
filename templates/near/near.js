drinkapp.controller('near', function ($scope, service_utility, service_drink, $timeout) {
    console.log('near controller start');
    var map, marker, infowindow;
    var lat, lng, position;
    //設定google路徑服務的api
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true
    });

    $scope.initialMap = function () {
        service_utility.getGPS().then(onSuccess, onError);

        function onSuccess(gpsdata) {
            lat = gpsdata.lat;
            lng = gpsdata.lng;

            position = new google.maps.LatLng(gpsdata.lat, gpsdata.lng);
            var map_element = $('#googlemap');
            var mapOptions = {
                zoom: 16,
                center: position,
                disableDefaultUI: true
            };
            //初始化google map
            map = new google.maps.Map(map_element[0], mapOptions);
            //指定到scope上面去
            $scope.map = map;
            //設定路徑顯示的地圖
            directionsDisplay.setMap(map);
            marker = new google.maps.Marker({
                position: position,
                map: map
            });

            google.maps.event.addListener(map, 'idle', function (event) {
                map_element.find('a').remove();

            });
            getShopList(lat, lng);
        }

        function onError(e) {
            alert('找不到gps資訊，現在先幫你設定到一個假的gps');
            console.log(e);
            var data = {
                lat: 22.6239237,
                lng: 120.3187878
            };
            onSuccess(data);
        }

    };

    function getShopList(lat, lng) {
        service_drink.getShops(lat, lng).then(function () {
            $scope.shopList = service_drink.shopList;
        });
    }

    $scope.gotoStore = function () {
        mainNavigator.pushPage('templates/store/store.html');
    };

    $scope.gotoSetting = function () {
        mainNavigator.pushPage('templates/setting/setting.html');
    };

    $scope.distance = function (shop) {
        var lat1 = shop.lat;
        var lng1 = shop.lng;
        var lat2 = lat || 0;
        var lng2 = lng || 0;
        var distance = jsdistance(lat1, lng1, lat2, lng2, 'K');
        return Math.floor(distance);
    };

    $scope.clickShop = function (shop) {
        $scope.nowShop = shop;
        $scope.nowShop_id = shop.$loki;

        google.maps.event.trigger(map, "resize");
        var shop_position = new google.maps.LatLng(shop.lat, shop.lng);
        //kill marker
        if ($scope.shop_marker) {
            $scope.shop_marker.setMap(null);
        }

        //remake marker
        $scope.shop_marker = new google.maps.Marker({
            position: shop_position,
            map: map,
            icon: 'img/drink-icon.png'
        });

        var request = {
            origin: position,
            destination: shop_position,
            travelMode: google.maps.TravelMode.WALKING
        };

        directionsService.route(request, function (response, status) {
            console.log(status);
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });

    };

    $scope.gotoStore = function () {
        service_drink.now_shop = $scope.nowShop;
        mainNavigator.pushPage('templates/store/store.html');
    };

    //only fire once when login 
    mainNavigator.once('postpush', function (e) {
        $scope.initialMap();
    });

    var height = $(document).height() - (44+200+10+10+40);
    $scope.style = {
        'height': height + 'px',
        'width': '100%'
    };


    window.scope_near = $scope;

});