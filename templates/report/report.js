drinkapp.controller('report', function ($scope, $http, service_url) {

    $scope.options = {
        1: '這間店已經沒有營業了',
        2: '這間店的電話或是地址有錯誤',
        3: '飲料的價目或是品名有錯誤',
        4: '其他'
    }

    $scope.option ={
        option : 1
    };

    $scope.sendReport = function () {
        var data = {
            option: $scope.option.option,
            message: $scope.message
        };

        $http.post(service_url.report, data).success(function () {
            // todo 
            $scope.reportSuccess = true;
        }).error(function (e) {
            console.log(e);
        });

    };

    window.scope_report = $scope;
});