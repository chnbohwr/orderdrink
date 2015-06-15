drinkapp.controller('report', function ($scope, $http, service_url) {

    ons.createAlertDialog('templates/report/alertSuccess.html').then(function (alertDialog) {
        $scope.alertSuccess = alertDialog;
    });

    $scope.options = {
        0: '請選擇狀況',
        1: '這間店已經沒有營業了',
        2: '這間店的電話或是地址有錯誤',
        3: '飲料的價目或是品名有錯誤',
        4: '其他'
    }

    $scope.option = 0;

    $scope.sendReport = function () {
        var data = {
            option: $scope.option,
            message: $scope.message
        };

        $http.post(service_url.report, data).success(function () {
            $scope.alertSuccess.show();
        }).error(function (e) {
            console.log(e);
        });

    };

    $scope.$on('$destroy', function () {
        $scope.alertSuccess.destroy();
    });

    window.scope_report = $scope;
});