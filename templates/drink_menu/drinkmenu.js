drinkapp.controller('drinkmenu', function ($scope, service_drink, $timeout) {

    //監聽頁面RENDER完畢才去讀取飲料的清單
    mainNavigator.once('postpush', function () {
        service_drink.getShopMenu().then(function () {
            $scope.menu = service_drink.now_shop_menu;
        }, function () {
            $scope.message = '很抱歉目前我們還沒有該店家的菜單資訊，我們會盡快補上';
        });
    });

    $scope.selection = {

    };

    $scope.add_drink = function (drink) {
        $scope.now_drink = drink;
        //檢查一下
        initialSelection();
        drinkmenu_modal.show();
    };

    function initialSelection() {
        //預設選項
        $scope.cup = 'l';
        $scope.ice = 0;
        $scope.sugar = 0;
        $scope.number = 1;

        //這邊要檢查一下 如果只有中杯就先幫他預選中杯
        if ($scope.now_drink.price_m && !$scope.now_drink.price_l) {
            $scope.cup = 'm';
        }

        if ($scope.now_drink.price_l && !$scope.now_drink.price_m) {
            $scope.cup = 'l';
        }

        //如果是熱飲就只能選熱的
        if ($scope.now_drink.onlyhot) {
            $scope.ice = 4;
        }

    }

    $scope.changeNumber = function (number) {
        $scope.number = number;
    };

    $scope.changeCup = function (cup) {
        $scope.cup = cup;
    };

    $scope.changeIce = function (ice) {
        $scope.ice = ice;
    };

    $scope.changeSugar = function (sugar) {
        $scope.sugar = sugar;
    };

    $scope.selectOver = function () {

        drinkmenu_modal.hide();
        var name = $scope.now_drink.name;

        if (!$scope.selection[name]) {
            $scope.selection[name] = [];
        }

        var find_same_drink = false;
        for (var i in $scope.selection[name]) {
            var exist_selection = $scope.selection[name][i];
            if (exist_selection.sugar === $scope.sugar && exist_selection.cup === $scope.cup && exist_selection.ice === $scope.ice) {
                exist_selection.number = (parseInt(exist_selection.number) + parseInt($scope.number));
                find_same_drink = true;
                break;
            }
        }

        var price;

        if ($scope.cup === 'l') {
            price = $scope.now_drink.price_l;
        } else {
            price = $scope.now_drink.price_m;
        }
        if (!find_same_drink) {
            var object_selection = {
                cup: $scope.cup,
                sugar: $scope.sugar,
                ice: $scope.ice,
                number: $scope.number,
                price: price
            };

            $scope.selection[name].push(object_selection);
        }

        //統計按鈕顯示與否
        $scope.caculateButton = true;
    };


    $scope.deleteSelection = function (drink_name, select) {
        if (select.number === 1) {
            for (var i in $scope.selection[drink_name]) {
                var data_select = $scope.selection[drink_name][i];
                if (data_select.cup === select.cup && data_select.sugar === select.sugar && data_select.ice === select.ice) {
                    $scope.selection[drink_name].splice(i, 1);
                    break;
                }
            }
            if ($scope.selection[drink_name].length === 0) {
                delete $scope.selection[drink_name];
            }
        } else {
            select.number = (parseInt(select.number) - 1);
        }

        if (!Object.keys($scope.selection).length) {
            $scope.caculateButton = false;
        }
    };

    $scope.caculate = function () {
        service_drink.selection = $scope.selection;
        mainNavigator.pushPage('templates/drink_menu/caculate.html');
    };

    $scope.checkSelection = function () {
        if (Object.keys($scope.selection).length) {
            return true;
        } else {
            return false;
        }
    };

    $scope.gotoReport = function () {
        if (!localStorage.token) {
            // if not login , ask user.
            $scope.loginDialog.show();
            
        } else {
            $timeout(function () {
            mainNavigator.pushPage('templates/report/report.html');
            }, 300);
        }
        
    };

    window.scope_drinkmenu = $scope;

});