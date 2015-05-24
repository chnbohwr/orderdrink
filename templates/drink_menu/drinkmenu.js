drinkapp.controller('drinkmenu', function ($scope) {
    console.log('drinkmenu controller start');

    $scope.fake_drink = [
        {
            name: '紅茶',
            id: '2',
            price: [20, 25]
        }, {
            name: '綠茶',
            id: '3',
            price: [20, 25]
        }, {
            name: '烏龍茶',
            id: '4',
            price: [20, 25]
        }, {
            name: '青茶',
            id: '5',
            price: [20, 25]
        }, {
            name: '普洱茶',
            id: '6',
            price: [20, 25]
        }
    ];

    $scope.selection = {

    };

    $scope.add_drink = function (drink) {
        $scope.now_drink = drink.id;
        drinkmenu_modal.show();
    };

    function initialSelection() {
        $scope.cup = 'm';
        $scope.ice = '0';
        $scope.sugar = '0';
        $scope.number = '1';
    }

    $scope.selectOver = function () {

        drinkmenu_modal.hide();

        if (!$scope.selection[$scope.now_drink]) {
            $scope.selection[$scope.now_drink] = [];
        }

        var find_same_drink = false;
        for (var i in $scope.selection[$scope.now_drink]) {
            var exist_selection = $scope.selection[$scope.now_drink][i];
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

            $scope.selection[$scope.now_drink].push(object_selection);
        }

        initialSelection();

    }

    $scope.deleteSelection = function (drink_id, select) {
        if (select.number === '1') {
            for (var i in $scope.selection[drink_id]) {
                var data_select = $scope.selection[drink_id][i];
                if (data_select.cup === select.cup && data_select.sugar === select.sugar && data_select.ice === select.ice) {
                    $scope.selection[drink_id].splice(i, 1);
                    return;
                }
            }
        } else {
            select.number = (parseInt(select.number) - 1).toString();
        }
    }

    initialSelection();


    window.scope_drinkmenu = $scope;

});