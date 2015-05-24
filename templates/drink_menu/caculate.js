drinkapp.controller('caculate', function ($scope) {
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


});