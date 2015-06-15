drinkapp.controller('editprofile', function ($scope, $http, service_url,$rootScope) {
    console.log('setting controller start');
    $scope.name = localStorage.nickname;

    $scope.changeName = function () {
        $http.post(service_url.profile, {
            nickname: $scope.name
        }).success(function () {
            localStorage.nickname = $scope.name;
            $scope.message = '修改成功';
            $rootScope.$broadcast('change_name');
        }).error(function () {
            $scope.name = localStorage.name;
            $scope.message = '網路有問題,修改失敗';
        })
    };
    
});