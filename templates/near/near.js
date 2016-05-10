drinkapp.controller('near', function ($scope, service_utility, service_drink, $timeout) {

    var map, marker, infowindow;
    var lat, lng, position;
    //設定google路徑服務的api
    var directionsService, directionsDisplay;
    $scope.card_open = false;
    $scope.toggleCard = function () {
        $scope.card_open = !$scope.card_open;
    };

    $scope.initialMap = function () {
        window.gps_modal.show();
        //if no google map 
        if (!window.google_map_has_initial) {
            $timeout($scope.initialMap, 200);
            return;
        }
        directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true
        });

        service_utility.getGPS().then(onSuccess, onError);
        
        function onSuccess(gpsdata) {
            window.gps_modal.hide();
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

            getShopList();
        }

        function onError(e) {
            window.gps_modal.hide();
            navigator.notification.alert('目前您沒有允許app取得GPS權限，所以我們幫你設定一個預設的位置可以讓您體驗，如果您有打開GPS以後就可以正確定位到您的所在地了。', function () {}, '小提醒');

            var data = {
                lat: 22.6239237,
                lng: 120.3187878
            };
            onSuccess(data);
        }
        
        navigator.splashscreen.hide();

    };

    function getShopList() {
        service_drink.getShops(lat, lng).then(function () {
            $scope.shopList = service_drink.shopList;
        });
    }

    $scope.distance = function (shop) {
        var lat1 = shop.lat;
        var lng1 = shop.lng;
        var lat2 = lat || 0;
        var lng2 = lng || 0;
        var distance = jsdistance(lat1, lng1, lat2, lng2, 'K');
        return Math.floor(distance);
    };

    //點選商店繪製地圖路徑
    $scope.clickShop = function (shop) {
        $scope.nowShop = shop;
        $scope.nowShop_id = shop.id;

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

            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });

    };

    $scope.gotoStore = function () {
        service_drink.now_shop = $scope.nowShop;
        $timeout(function () {
            mainNavigator.pushPage('templates/store/store.html');
        }, 310);

    };

    $scope.lookMenu = function () {
        service_drink.now_shop = $scope.nowShop;
        $timeout(function () {
            mainNavigator.pushPage('templates/drink_menu/drinkmenu.html');
        }, 310);
    }

    $scope.callShop = function () {
        window.location.href = "tel://" + $scope.nowShop.phone;
    }

    $scope.gotoSetting = function () {
        //TODO here only member can get in
        if (!localStorage.token) {
            // if not login , ask user.
            $scope.loginDialog.show();
            
        } else {
            mainNavigator.pushPage('templates/setting/setting.html');
        }

    };

    //only fire once when login 
    mainNavigator.once('postpush', function (e) {
        $scope.initialMap();
    });

    var height = $(document).height() - (240 + 44);
    $scope.style = {
        'height': height + 'px',
        'width': '100%'
    };


    //點選畫面右上角重新整理 gps 座標
    $scope.reInitialGps = function () {

        service_utility.getGPS().then(onSuccess, onError);

        function onSuccess(gpsdata) {
            lat = gpsdata.lat;
            lng = gpsdata.lng;
            //重新設定地圖上的 position
            position = new google.maps.LatLng(gpsdata.lat, gpsdata.lng);

            marker.setPosition(position);

            //如果現在有在觀望商店
            if ($scope.nowShop) {
                $scope.clickShop($scope.nowShop);
            } else {
                map.setCenter(position);
            }

            //更新商店列表
            getShopList();
        }

        function onError() {
            navigator.notification.alert('無法連結裝置的GPS訊號', function () {}, '小提醒');
        }
    };


    //收到重新整理店家的 BROADCAST
    $scope.$on('refreshShop', getShopList);
    
    mainNavigator.pages.splice(0,1);
    
    
    window.scope_near = $scope;

});