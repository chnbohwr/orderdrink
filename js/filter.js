drinkapp.filter('sugar', function () {
    return function (input) {
        
        switch (parseInt(input)) {
        case 0:
            return '正常甜';
            break;
        case 1:
            return '少糖';
            break;
        case 2:
            return '半糖';
            break;
        case 3:
            return '微糖';
            break;
        case 4:
            return '無糖';
            break;
        default:
            return '沒選擇'
        }
    };
});

drinkapp.filter('ice', function () {
    return function (input) {
        switch (parseInt(input)) {
        case 0:
            return '正常冰';
            break;
        case 1:
            return '少冰';
            break;
        case 2:
            return '去冰';
            break;
        case 3:
            return '常溫';
            break;
        case 4:
            return '溫';
            break;
        default:
            return '沒選擇'
        }
    };
});

drinkapp.filter('cup', function () {
    return function (input) {
        switch (input) {
        case 'm':
            return '中杯';
            break;
        case 'l':
            return '大杯';
            break;
        default:
            return '沒選擇'
        }
    };
});