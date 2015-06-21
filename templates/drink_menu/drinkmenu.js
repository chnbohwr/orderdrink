drinkapp.controller('drinkmenu', function ($scope, service_drink) {

    console.log('drinkmenu controller start');

    service_drink.getShopMenu().then(function () {
        $scope.menu = service_drink.now_shop_menu;
    }, function () {
        $scope.message = '很抱歉目前我們還沒有該店家的菜單資訊，我們會盡快補上';
    });

    console.log($scope.menu);

    $scope.selection = {

    };

    $scope.add_drink = function (drink) {
        $scope.now_drink = drink;
        drinkmenu_modal.show();
    };

    function initialSelection() {
        $scope.cup = 'l';
        $scope.ice = '0';
        $scope.sugar = '0';
        $scope.number = '1';
    }

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
                exist_selection.number = (parseInt(exist_selection.number) + parseInt($scope.number)).toString();
                find_same_drink = true;
                break;
            }
        }
        if (!find_same_drink) {
            var object_selection = {
                cup: $scope.cup,
                sugar: $scope.sugar,
                ice: $scope.ice,
                number: $scope.number
            };

            $scope.selection[name].push(object_selection);
        }

        initialSelection();

    }

    $scope.deleteSelection = function (drink_name, select) {
        if (select.number === '1') {
            for (var i in $scope.selection[drink_name]) {
                var data_select = $scope.selection[drink_name][i];
                if (data_select.cup === select.cup && data_select.sugar === select.sugar && data_select.ice === select.ice) {
                    $scope.selection[drink_name].splice(i, 1);
                    return;
                }
            }
        } else {
            select.number = (parseInt(select.number) - 1).toString();
        }
    }

    initialSelection();

    $scope.gotoReport = function () {
        mainNavigator.pushPage('templates/report/report.html');
    };

    window.scope_drinkmenu = $scope;

});